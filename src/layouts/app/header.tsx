"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { SearchIcon, BellIcon, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">VisaConnect Forum</h1>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/threads" className="text-gray-600 hover:text-gray-800">
            Threads
          </Link>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Categories
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Members
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Help
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <motion.div
            initial={false}
            animate={{ width: isSearchOpen ? "auto" : 40 }}
            className="relative"
          >
            <Input
              placeholder="Search threads..."
              className={`pl-10 pr-4 py-2 w-full bg-gray-100 rounded-full transition-all ${
                isSearchOpen ? "opacity-100" : "opacity-0"
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
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="@user"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 hover:text-gray-800 py-2">
                Home
              </Link>
              <Link href="/threads" className="text-gray-600 hover:text-gray-800 py-2">
                Threads
              </Link>
              <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
                Categories
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
                Members
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 py-2">
                Help
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
