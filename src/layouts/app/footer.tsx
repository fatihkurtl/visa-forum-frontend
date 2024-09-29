"use client"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Heart, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {

  const handleDonate = () => {
    // Redirect to donation page or open donation modal
    window.open('https://your-donation-link.com', '_blank');
  }

  const handleBuyCoffee = () => {
    // Redirect to Buy Me a Coffee page or similar
    window.open('https://www.buymeacoffee.com/your-page', '_blank');
  }

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">VisaConnect Forum</h3>
            <p className="text-sm text-gray-600">
              Connecting visa applicants and sharing experiences to make the process easier for everyone.
            </p>
          </div>
          <nav className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-800">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-800">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-800">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Support Us</h3>
            <p className="text-sm text-gray-600">
              Help us keep VisaConnect Forum running and improve our services.
            </p>
            <div className="space-y-2">
              <Button onClick={handleDonate} variant="outline" className="w-full">
                <Heart className="mr-2 h-4 w-4" /> Donate
              </Button>
              <Button onClick={handleBuyCoffee} variant="outline" className="w-full">
                <Coffee className="mr-2 h-4 w-4" /> Buy us a coffee
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} VisaConnect Forum. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}