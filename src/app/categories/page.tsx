import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plane, Globe, FileText, Users, HelpCircle, Briefcase, GraduationCap, Heart } from "lucide-react"

const categories = [
  {
    title: "Tourist Visas",
    description: "Discuss travel visas for tourism and short-term visits.",
    icon: Plane,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    threadCount: 1243,
  },
  {
    title: "Work Visas",
    description: "Information on visas for employment opportunities abroad.",
    icon: Briefcase,
    color: "text-green-500",
    bgColor: "bg-green-100",
    threadCount: 987,
  },
  {
    title: "Student Visas",
    description: "Guidance for international students seeking study visas.",
    icon: GraduationCap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    threadCount: 756,
  },
  {
    title: "Family Visas",
    description: "Discuss visas for family reunification and marriage.",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-100",
    threadCount: 532,
  },
  {
    title: "Visa Application Process",
    description: "General discussions about visa application procedures.",
    icon: FileText,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    threadCount: 1876,
  },
  {
    title: "Country-Specific Visas",
    description: "Visa information for specific countries.",
    icon: Globe,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
    threadCount: 2341,
  },
  {
    title: "Visa Experiences",
    description: "Share your visa application and interview experiences.",
    icon: Users,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
    threadCount: 1654,
  },
  {
    title: "Visa Help & Support",
    description: "Get help with visa-related questions and issues.",
    icon: HelpCircle,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    threadCount: 998,
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Visa Categories</h1>
      <p className="text-gray-600 mb-8">
        Explore our visa categories to find discussions relevant to your needs. Click on a category to view related threads.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link href={`/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className={`p-2 rounded-full ${category.bgColor}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {category.threadCount} threads
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">
                    {category.threadCount > 1000 ? 'Popular' : 'Active'}
                  </Badge>
                  <span className="text-sm text-gray-500">View threads →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}