"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, TrendingUpIcon } from "lucide-react";
import { ICategory } from "@/interfaces/thread";
import { ThreadHelper } from "@/helpers/threads";
import api from "@/services/api";
import { slugify } from "@/utils/slugify";

const threadHelper = new ThreadHelper(api);

export default function Sidebar() {

  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await threadHelper.getCategories();
        console.log("Categories: ", response);
        if (!response) return;
        setCategories(response);
      } catch (error) {
        console.log("Error: ", error);
        setError("Hata oluştu, Kategoriler alınırken bir hata oluştu");
      }
    };

    getCategories();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search: ", search);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Hızlı Arama</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSearchSubmit}>
            <Input id="search" name="search" value={search} onChange={handleSearch} placeholder="Konuları ara..." />
            <Button className="w-full">
              <SearchIcon className="mr-2 h-4 w-4" />
              Ara
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Kategoriler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/categories/${slugify(category.name)}`} className="text-gray-600 hover:text-gray-800">
                    {category.name} ({category.threads?.length > 0 ? category.threads.length : 0})
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-600">Henüz eklenmiş bir vize kategorisi bulunmamaktadır.</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Forum İstatistikleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Konu Sayısı:</span>
              <span className="font-semibold">1,234</span>
            </li>
            <li className="flex justify-between">
              <span>Gönderi Sayısı:</span>
              <span className="font-semibold">5,678</span>
            </li>
            <li className="flex justify-between">
              <span>Üyeler</span>
              <span className="font-semibold">9,012</span>
            </li>
            <li className="flex justify-between">
              <span>En Yeni Üye:</span>
              <span className="font-semibold">JohnDoe</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Gündemdeki Konular
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-blue-500" />
              <a href="#" className="text-gray-600 hover:text-gray-800">
                ABD Vize Bekleme Süreleri
              </a>
            </li>
            <li className="flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-blue-500" />
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Schengen Vizesi İpuçları
              </a>
            </li>
            <li className="flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-blue-500" />
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Kanada Eğitim İzinleri
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
