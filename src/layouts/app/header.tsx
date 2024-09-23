"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { SearchIcon, BellIcon, MenuIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { slugify } from "@/utils/slugify"
import Image from "next/image"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="VisaConnect Forum Logo" width={40} height={40} className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-800">VisaConnect Forum</h1>
          </Link>
          <nav className="hidden lg:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-800 font-medium">
              Home
            </Link>
            <Link href="/threads" className="text-gray-600 hover:text-gray-800 font-medium">
              Threads
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-800 font-medium">
              Categories
            </Link>
            <Link href="/members" className="text-gray-600 hover:text-gray-800 font-medium">
              Members
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-gray-800 font-medium">
              Help
            </Link>
            <Link href="/visaBot" className="text-gray-600 hover:text-gray-800 font-medium">
              Visa Chat Bot (Coming Soon)
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <motion.div
              initial={false}
              animate={{ width: isSearchOpen ? "auto" : 40 }}
              className="relative hidden sm:block"
            >
              <Input
                placeholder="Search threads..."
                className={`pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full transition-all ${isSearchOpen ? "opacity-100" : "opacity-0"
                  }`}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-0 h-full"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </Button>
            </motion.div>
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link href={`/members/${slugify("John Doe")}`} className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700">John Doe</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Home
              </Link>
              <Link href="/threads" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Threads
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Categories
              </Link>
              <Link href="/members" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Members
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Help
              </Link>
              <Link href="/visaBot" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Visa Chat Bot (Coming Soon)
              </Link>
              <div className="relative">
                <Input
                  placeholder="Search threads..."
                  className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}