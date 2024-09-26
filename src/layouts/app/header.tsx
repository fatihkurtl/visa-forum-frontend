"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { SearchIcon, BellIcon, MenuIcon, UserIcon, LogOutIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { slugify } from "@/utils/slugify"
import Image from "next/image"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const notificationRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const notifications = [
    { id: 1, text: "Konunuza yeni yanıt", time: "5 dakika önce" },
    { id: 2, text: "Gönderiniz beğenildi", time: "1 saat önce" },
    { id: 3, text: "Yeni forum duyurusu", time: "1 gün önce" },
  ]

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
              Anasayfa
            </Link>
            <Link href="/threads" className="text-gray-600 hover:text-gray-800 font-medium">
              Konular
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-800 font-medium">
              Kategoriler
            </Link>
            <Link href="/members" className="text-gray-600 hover:text-gray-800 font-medium">
              Üyeler
            </Link>
            <Link href="/visaBot" className="text-gray-600 hover:text-gray-800 font-medium">
              Vize Sohbet Botu (Çok Yakında)
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
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 text-center">
                    <Link href="/notifications" className="text-sm text-blue-600 hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={userDropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-gray-700">John Doe</span>
              </Button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href={`/members/${slugify("John Doe")}`} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" /> Profile
                  </Link>
                  <Link href="/settings" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <LogOutIcon className="mr-2 h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
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
                Anasayfa
              </Link>
              <Link href="/threads" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Konular
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Kategoriler
              </Link>
              <Link href="/members" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Üyeler
              </Link>
              <Link href="/visaBot" className="text-gray-600 hover:text-gray-800 py-2 font-medium">
                Vize Sohbet Botu (Çok Yakında)
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