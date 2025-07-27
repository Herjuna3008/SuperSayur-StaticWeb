import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/company-profile", label: "Company Profile" },
  { href: "/faq", label: "FAQ" },
  { href: "/jangkauan-pengiriman", label: "Jangkauan" },
  { href: "/product", label: "Produk" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 900);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <>
      {/* Bar Atas */}
      <div className="w-full bg-white flex justify-between items-center px-6 py-4 shadow-sm z-40">
        <div className="flex items-center gap-3">
          <img src="https://ik.imagekit.io/hexocdn/Logo%20Super%20Sayur@300x.png?updatedAt=1753571167387" alt="Logo" className="h-10 w-auto" />
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-green-700 whitespace-nowrap hover:text-green-600 transition-colors duration-200"
          >
            SuperSayur
          </Link>
        </div>
        <Link
          href="/contact"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-2 transition shadow"
        >
          Whatsapp
        </Link>
      </div>

      {/* Bar Bawah: Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-[#f6f6f0] border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop */}
          {!isMobile && (
            <nav className="flex justify-center gap-8 items-center h-16">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-2 py-2 text-lg font-medium text-[#78826b] transition group"
                >
                  <span>{item.label}</span>
                  {/* Underline animasi */}
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded"></span>
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile */}
          {isMobile && (
            <div className="flex justify-between items-center h-16">
              <div />
              <button
                onClick={() => {
                  window.scrollBy({ top: 200, left: 0, behavior: "smooth" });
                  setMobileOpen((v) => !v);
                }}                
                className="text-3xl text-green-800"
                aria-label="Open Menu"
              >
                {mobileOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobile && (
          <div
            className={`fixed top-[72px] left-0 w-full bg-[#f6f6f0] shadow-lg z-50 transition-all duration-400 ease-in-out overflow-hidden
              ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            `}
            style={{ transitionProperty: "max-height,opacity" }}
          >
            <nav className="flex flex-col gap-3 px-8 py-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-semibold text-[#78826b] px-2 py-3 rounded hover:bg-green-100 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
