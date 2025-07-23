import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/company-profile", label: "Company Profile" },
  { href: "/faq", label: "FAQ" },
  { href: "/jangkauan-pengiriman", label: "Jangkauan" },
  { href: "/product", label: "Produk" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-green-700 whitespace-nowrap hover:text-green-600 transition-colors duration-200">
          SuperSayur
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks && navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 font-medium text-gray-700 text-sm transition-all duration-300 hover:text-green-600 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2 rounded-full bg-green-600 text-white font-semibold shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:scale-105 text-sm"
          >
            WhatsApp
          </a>
        </div>
        
        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <div className={`hamburger ${open ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown origin-top">
          <div className="flex flex-col px-6 py-4 space-y-2">
            {navLinks && navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-gray-700 font-medium border-b border-gray-100 hover:text-green-600 hover:bg-green-50 rounded-md transition-all duration-200"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-md text-center transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:scale-105"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
