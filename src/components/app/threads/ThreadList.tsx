"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquareIcon, UserIcon, ClockIcon, PlusCircleIcon, FilterIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { slugify } from "@/utils/slugify";
import { ICategory, IThread } from "@/interfaces/thread";
import { ThreadHelper } from "@/helpers/threads"
import api from "@/services/api"
import { isMemberAuthenticated } from "@/middlewares/cookies";
import { timeAgo } from "@/composables/date";


const threadHelper = new ThreadHelper(api);

export default function ThreadList() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState("latest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [threads, setThreads] = useState<IThread[]>([]);
  const [visibleThreadsCount, setVisibleThreadsCount] = useState<number>(10);

  useEffect(() => {
    const handleAuth = async () => {
      const memberAuth = await isMemberAuthenticated()
      console.log("memberAuth: ", memberAuth);
      if (memberAuth) {
        setIsAuth(memberAuth)
      }

    }

    handleAuth()
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response: ICategory[] = await threadHelper.getCategories();
        console.log("Categories: ", response);
        if (!response) return;
        setCategories(response);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setError("Hata oluştu, Kategoriler alınırken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);


  useEffect(() => {
    const getThreads = async () => {
      try {
        setLoading(true);
        const response: IThread[] = await threadHelper.getThreads();
        if (!response) return;
        setThreads(response);
        setLoading(false);
        console.log("Threads: ", response);
      } catch (error) {
        console.error("Error: ", error);
        setError("Hata olası, Konular yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    }

    getThreads();
  }, [])

  const sortedAndFilteredThreads = threads
    .filter(
      (thread) => filterCategory === "all" || thread.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "latest")
        return new Date(b.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === "mostViewed") return b.views - a.views;
      if (sortBy === "mostReplies") return b.comments.length - a.comments.length;
      return 0;
    });

  const handleLoadMore = () => {
    setVisibleThreadsCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="md:col-span-3">
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">En Son</SelectItem>
                  <SelectItem value="mostViewed">En Çok Okunan</SelectItem>
                  <SelectItem value="mostReplies">
                    En Çok Yanıtlanan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-500" />
              <Select
                value={filterCategory}
                onValueChange={setFilterCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Kategoriler</SelectItem>
                  {categories && categories.length > 0 &&
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {isAuth ? (
              <Link href="/threads/create">
                <Button>
                  <PlusCircleIcon className="mr-2 h-5 w-5" />
                  Yeni Konu
                </Button>
              </Link>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>
                      <PlusCircleIcon className="mr-2 h-5 w-5" />
                      Yeni Konu
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Yeni bir konu başlatmak ister misiniz? Lütfen <Link href="/login" className="underline text-blue-500 hover:text-blue-600">oturum açın</Link> ve hemen başlayın!
                    </p>
                  </TooltipContent>

                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {loading && (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))
        )}
        {sortedAndFilteredThreads && (
          sortedAndFilteredThreads.slice(0, visibleThreadsCount).map((thread, index) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        <Link href={{
                          pathname: `/threads/${slugify(thread.title)}`,
                          query: { id: thread.id },
                        }}>
                          {thread.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                      &apos;{thread.author}&apos; tarafından oluşturuldu
                      </p>
                    </div>
                    <Badge variant="secondary">{thread.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                      {thread.comments.length} yorum
                    </span>
                    <span className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {thread.views} görüntülenme
                    </span>
                    {thread.comments.length > 0 ?
                      (
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {timeAgo(thread.comments[0].created_at)}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <p className="text-sm text-gray-500">Yorum yok</p>
                        </span>
                      )
                    }
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
        <div className="mt-4 text-center">
          {sortedAndFilteredThreads.length > visibleThreadsCount && (
            <Button onClick={handleLoadMore} variant="outline" size="sm" disabled={loading}>
              Daha Fazla Yükle
            </Button>
          )}
        </div>
        {error !== null && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
