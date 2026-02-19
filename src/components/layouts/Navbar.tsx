"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Determine if we are on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isLightMode = isHomePage && !isScrolled;
  const isDarkMode = !isLightMode;

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full z-50 p-4 md:p-8 transition-all duration-300 pointer-events-none
      ${isDarkMode ? "py-4 bg-black/50 backdrop-blur-lg" : ""}
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`text-2xl font-bold tracking-wide transition-colors duration-300
                ${isLightMode ? "text-black" : "text-white"}
              `}
            >
                Injam H.
            </Link>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-1 px-1 py-1 rounded-full border transition-all duration-300
          ${isLightMode
             ? "bg-black text-white border-black/10 shadow-lg"
             : "bg-white/10 border-white/5 backdrop-blur-md"
          }
        `}>
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                      key={link.name}
                      href={link.href}
                      className={`
                        relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
                        ${isActive
                           // Active: Always Black Text because Pill is White
                           ? "text-black font-bold"
                           // Inactive:
                           : (isLightMode ? "text-zinc-400 hover:text-white" : "text-zinc-400 hover:text-white")
                        }
                      `}
                  >
                      {isActive && (
                          <motion.span
                              layoutId="active-nav-pill"
                              className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                      )}

                      <span className="relative z-10">{link.name}</span>
                  </Link>
                );
            })}
        </div>

        {/* CTA / Right Side */}
        <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg
              ${isLightMode
                 ? "bg-black text-white hover:bg-zinc-800 shadow-black/20"
                 : "bg-white text-black hover:bg-zinc-200 shadow-white/10"
              }
            `}>
                Let&apos;s Talk
            </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden text-2xl p-2 rounded-full backdrop-blur-sm transition-colors
            ${isLightMode ? "bg-black/10 text-black" : "bg-zinc-900/50 text-white"}
          `}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars />
        </button>

      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 pointer-events-auto"
          >
             <button
               className="absolute top-8 right-8 text-white text-3xl hover:text-purple-500 transition-colors"
               onClick={() => setIsMobileMenuOpen(false)}
             >
               <FaXmark />
             </button>

             {navLinks.map((link) => {
               const isActive = pathname === link.href;
               return (
                 <Link
                   key={link.name}
                   href={link.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className={`text-3xl font-bold transition-colors ${isActive ? "text-purple-500" : "text-zinc-500 hover:text-white"}`}
                 >
                   {link.name}
                 </Link>
               );
             })}

             <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-3 rounded-full bg-white text-black font-bold text-lg mt-8"
             >
               Let&apos;s Talk
             </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
