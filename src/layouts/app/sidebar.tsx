import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, TrendingUpIcon } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Search threads..." />
            <Button className="w-full">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Tourist Visa
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Student Visa
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Work Visa
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Family Visa
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Other Visas
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Forum Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Threads:</span>
              <span className="font-semibold">1,234</span>
            </li>
            <li className="flex justify-between">
              <span>Posts:</span>
              <span className="font-semibold">5,678</span>
            </li>
            <li className="flex justify-between">
              <span>Members:</span>
              <span className="font-semibold">9,012</span>
            </li>
            <li className="flex justify-between">
              <span>Newest Member:</span>
              <span className="font-semibold">JohnDoe</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-blue-500" />
              <a href="#" className="text-gray-600 hover:text-gray-800">
                US Visa Wait Times
              </a>
            </li>
            <li className="flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-blue-500" />
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Schengen Visa Tips
              </a>
            </li>
            <li className="flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-blue-500" />
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Canada Study Permits
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
