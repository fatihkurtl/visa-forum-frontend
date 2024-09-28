"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquareIcon,
  UserIcon,
  ClockIcon,
  PlusCircleIcon,
  FilterIcon,
} from "lucide-react";
import { slugify } from "@/utils/slugify";
import { ICategory } from "@/interfaces/thread";
import { ThreadHelper } from "@/helpers/threads"
import api from "@/services/api"


const threadHelper = new ThreadHelper(api);

export default function ThreadList() {

  const [sortBy, setSortBy] = useState("latest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  // const [threads, setThreads] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response: ICategory[] = await threadHelper.getCategories();
        console.log("Categories: ", response);
        if (!response) return;
        setCategories(response.reverse());
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
      const response = threadHelper.getThreads();
      console.log("Threads: ", response);
    }

    getThreads();
  }, [])

  const threads = [
    {
      id: 1,
      title: "US B1/B2 Visa Slot Available",
      category: "Tourist Visa",
      user: "Emma S.",
      replies: 5,
      views: 120,
      lastReply: "2 hours ago",
      createdAt: new Date("2023-06-10T10:00:00"),
    },
    {
      id: 2,
      title: "Schengen Visa Appointment Open",
      category: "Schengen Visa",
      user: "Michael L.",
      replies: 3,
      views: 85,
      lastReply: "4 hours ago",
      createdAt: new Date("2023-06-09T15:30:00"),
    },
    {
      id: 3,
      title: "Canada Study Permit Slot",
      category: "Student Visa",
      user: "Rahul K.",
      replies: 7,
      views: 200,
      lastReply: "1 day ago",
      createdAt: new Date("2023-06-08T09:45:00"),
    },
    {
      id: 4,
      title: "Schengen Visa Appointment Open",
      category: "Schengen Visa",
      user: "Michael L.",
      replies: 3,
      views: 85,
      lastReply: "4 hours ago",
      createdAt: new Date("2023-06-07T15:30:00"),
    },
    {
      id: 5,
      title: "Schengen Visa Appointment Open",
      category: "Schengen Visa",
      user: "Michael L.",
      replies: 3,
      views: 85,
      lastReply: "4 hours ago",
      createdAt: new Date("2023-06-06T15:30:00"),
    },
  ];

  const sortedAndFilteredThreads = threads
    .filter(
      (thread) => filterCategory === "all" || thread.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "latest")
        return b.createdAt.getTime() - a.createdAt.getTime();
      if (sortBy === "mostViewed") return b.views - a.views;
      if (sortBy === "mostReplies") return b.replies - a.replies;
      return 0;
    });
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
            <Link href="/threads/create">
              <Button>
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                New Thread
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {sortedAndFilteredThreads.map((thread, index) => (
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
                      <Link href={`/threads/${slugify(thread.title)}`}>{thread.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Started by {thread.user}
                    </p>
                  </div>
                  <Badge variant="secondary">{thread.category}</Badge>
                </div>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <MessageSquareIcon className="h-4 w-4 mr-1" />
                    {thread.replies} replies
                  </span>
                  <span className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" />
                    {thread.views} views
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {thread.lastReply}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
