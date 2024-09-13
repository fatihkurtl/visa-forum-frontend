
export default function Footer() {
    return (
        <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2023 VisaConnect Forum. All rights reserved.
          </p>
          <nav>
            <ul className="flex space-x-4 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    )
}