"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-4 bg-[#e5e5e5]/80 backdrop-blur-md shadow-sm" : "py-5 md:py-8 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3">
        <a href="#" className="text-2xl font-black tracking-tighter text-black">DAPHNE.</a>
        <div className="hidden md:flex gap-4 text-sm font-bold text-gray-600 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full border border-gray-300 shadow-sm">
          <a href="#about" className="hover:text-[#FF3366] transition-colors px-2">About</a>
          <a href="#journey" className="hover:text-[#FF3366] transition-colors px-2">Process</a>
          <a href="#work" className="hover:text-[#FF3366] transition-colors px-2">Work</a>
          <a href="#contact" className="hover:text-[#FF3366] transition-colors px-2">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="px-4 sm:px-6 py-2.5 bg-black text-white text-xs sm:text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
            Let&apos;s Talk ↗
          </a>
          <button
            type="button"
            className="md:hidden w-11 h-11 rounded-full border border-gray-300 bg-white/80 text-black flex items-center justify-center"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden="true" className="text-xl leading-none">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div id="mobile-navigation" className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-md">
          <div className="flex flex-col">
            {[
              ["About", "#about"],
              ["Process", "#journey"],
              ["Work", "#work"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-[#FF3366]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}