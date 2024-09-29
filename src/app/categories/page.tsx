"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Globe, FileText, Users, HelpCircle, Briefcase, GraduationCap, Heart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ICategory } from "@/interfaces/thread"
import { ThreadHelper } from "@/helpers/threads"
import api from "@/services/api"

const threadHelper = new ThreadHelper(api);

export default function CategoriesPage() {

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Vize Kategorileri</h1>
      <p className="text-gray-600 mb-8">
        İhtiyaçlarınızla ilgili tartışmaları bulmak için vize kategorilerimizi keşfedin. İlgili konuları görüntülemek için bir kategoriye tıklayın.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3 bg-gray-200 p-3 rounded-xl">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : (
          categories && (
            categories.map((category: ICategory) => (
              <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={category.id}>
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    {/* {category.image !== null && (
                      <div className="p-2 rounded-full">
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${category.image}`} className="h-16 w-16 rounded-full" width={64} height={64} alt={category.name} />
                      </div>
                    )} */}
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {category.threads.length} konu
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{category.sub_title}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        {category.threads.length > 100 ? 'Popüler' : 'Aktif'}
                      </Badge>
                      <span className="text-sm text-gray-500">Konuları görüntüle →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )
        )
        }
        {error !== null && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  )
}