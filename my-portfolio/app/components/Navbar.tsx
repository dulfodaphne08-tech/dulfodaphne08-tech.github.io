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
    const handleScroll = () => setScrolled(window.scrollY > 24);
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
    <nav className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6" aria-label="Main navigation">
      <div className={`nav-shell mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2.5 sm:px-5 ${scrolled ? "nav-shell--scrolled" : ""}`}>
        <a href="#" className="nav-brand shrink-0 text-xl font-black tracking-tighter sm:text-2xl">
          DAPHNE.
        </a>

        <div className="nav-links hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-link rounded-full px-3 py-2 text-sm font-bold">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a href="#contact" data-magnetic className="nav-cta rounded-full px-5 py-3 text-xs font-bold sm:text-sm">
            Let&apos;s Talk <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-bold tracking-widest lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          <span className={`menu-icon ${menuOpen ? "menu-icon--open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mobile-menu mx-auto mt-2 max-w-6xl rounded-3xl p-3 sm:p-4 lg:hidden"
          >
            <div className="grid gap-1">
              {links.map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                  className="mobile-menu-link flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-bold"
                >
                  {label}
                  <span aria-hidden="true" className="text-sm text-[#FF3366]">↗</span>
                </motion.a>
              ))}
            </div>
            <div className="mobile-menu-footer mt-2 flex items-center justify-between border-t px-4 pt-3">
              <span className="text-sm font-semibold">Appearance</span>
              <ThemeToggle compact />
            </div>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="nav-cta mt-3 flex min-h-12 items-center justify-center rounded-full text-sm font-bold lg:hidden"
            >
              Let&apos;s Talk <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
