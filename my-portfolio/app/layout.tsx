"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import AmbientExperience from "./components/AmbientExperience";
import Cursor from "./components/Cursor";
import StarfieldBackground from "./components/StarfieldBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import Script from "next/script";
import IntroAnimation from "./sections/IntroAnimation"; 
import './globals.css'

const themeInitScript = `try {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const saved = localStorage.getItem("portfolio-theme");
  const theme = (saved === "light" || saved === "dark") ? saved
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
} catch {
  document.documentElement.dataset.theme =
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" suppressHydrationWarning className="bg-[#f4f4f5] dark:bg-[#0B0B0D]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans overflow-x-hidden">
        <Script id="theme-init" strategy="beforeInteractive">{themeInitScript}</Script>
        
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            
            {isLoading && <IntroAnimation onComplete={() => setIsLoading(false)} />}

            {!isLoading && (
              <>
                <AmbientExperience />
                <StarfieldBackground />
                <Cursor />
              </>
            )}

            <div 
              className={`relative z-10 transition-opacity duration-1000 ${
                isLoading ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
              }`}
            >
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>

          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}