"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["About", "#about"],
  ["Process", "#journey"],
  ["Work", "#work"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 pt-6 md:pt-8 z-50 flex justify-center w-full px-4" aria-label="Main navigation">
      <div className={`flex w-full max-w-[900px] items-center justify-between rounded-full px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-300 border ${
        scrolled 
          ? "bg-white/95 dark:bg-[#121214]/95 border-gray-200 dark:border-[#26262A]" 
          : "bg-white/80 dark:bg-[#0B0B0D]/80 border-transparent dark:border-[#26262A]/50"
      }`}>
        
        <a href="#" aria-label="Home" className="flex items-center gap-2 pl-1 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-[#26262A]">
            <img src="/picture.png" alt="Daphne" className="w-full h-full object-cover grayscale" />
          </div>
          <span className="font-extrabold text-sm tracking-widest uppercase text-black dark:text-white">
            Daphne
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors dark:text-[#85858C] dark:hover:text-white">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-1">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <a href="#contact" className="px-5 py-2 border border-gray-200 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-50 transition-colors dark:bg-transparent dark:border-[#26262A] dark:text-white dark:hover:bg-[#171719]">
              Let&apos;s Talk
            </a>
          </div>
          
          <button
            type="button"
            className="flex md:hidden min-h-8 items-center gap-2 rounded-full px-3 text-[10px] font-bold tracking-widest text-black border border-gray-200 dark:text-white dark:border-[#26262A]"
            onClick={() => setMenuOpen((open) => !open)}
          >
            MENU
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-24 w-[calc(100%-2rem)] max-w-[400px] rounded-3xl p-4 bg-white shadow-xl border border-gray-200 md:hidden dark:bg-[#121214] dark:border-[#26262A]"
          >
            <div className="grid gap-1">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-black hover:bg-gray-50 dark:text-white dark:hover:bg-[#171719]"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}