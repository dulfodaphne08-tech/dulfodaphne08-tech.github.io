"use client";
import { useState, useEffect, useRef, PointerEvent } from "react";

export default function Hero() {
  const pictureSrc = "/picture.png";
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<number | null>(null);
  
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleIntroComplete = () => setIntroFinished(true);
    window.addEventListener("introComplete", handleIntroComplete);

    return () => {
      window.removeEventListener("introComplete", handleIntroComplete);
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    };
  }, []);

  const setColorReveal = (active: boolean) => {
    if (maskRef.current) {
      maskRef.current.style.opacity = active ? "1" : "0";
    }
  };

  const updatePointer = (e: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !maskRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Direct DOM manipulation bypasses React's rendering cycle for zero lag
    maskRef.current.style.setProperty('--p-x', `${x}px`);
    maskRef.current.style.setProperty('--p-y', `${y}px`);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    updatePointer(e);
    if (e.pointerType === "mouse") setColorReveal(true);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    updatePointer(e);
    if (e.pointerType === "touch") {
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
      setColorReveal(true);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
      touchTimer.current = window.setTimeout(() => setColorReveal(false), 900);
    }
  };

  return (
    <section className="hero-section relative w-full min-h-[100svh] overflow-hidden bg-transparent flex flex-col justify-end items-center">
      
      <style>{`
        .marquee-wrapper {
          display: flex;
          width: max-content;
          animation: 
            slideInFast 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards,
            infiniteScroll 25s linear 1.7s infinite;
        }

        @keyframes slideInFast {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(0); }
        }

        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* 1. MOVING BACKGROUND NAME */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center">
        {introFinished && (
          <div className="marquee-wrapper will-change-transform">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((copy) => (
              <h1
                key={copy}
                className="hero-wordmark-copy text-[30vw] md:text-[20vw] lg:text-[18vw] font-black uppercase tracking-[-0.04em] leading-none select-none text-black dark:text-white pr-6 md:pr-12"
                aria-hidden="true"
              >
                DAPHNE DULFO
              </h1>
            ))}
          </div>
        )}
      </div>

      {/* 2. PICTURE OVERLAY */}
      <div className="relative z-10 w-full flex justify-center items-end mt-auto">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setColorReveal(false)}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setColorReveal(false);
          }}
          className={`hero-picture-wrapper relative w-full sm:w-[85vw] md:w-[72vw] max-w-none md:max-w-[860px] h-[60svh] sm:h-[70svh] md:h-[85vh] cursor-crosshair touch-pan-y transition-all duration-1000 ${introFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <img
            src={pictureSrc}
            alt="Daphne"
            className="absolute inset-0 w-full h-full object-contain object-bottom grayscale drop-shadow-2xl"
            draggable={false}
          />

          {/* Color Reveal Mask - Updates outside of React's render cycle */}
          <div
            ref={maskRef}
            className="hero-mask-layer pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ease-out opacity-0"
            style={{
              backgroundImage: `url('${pictureSrc}')`,
              backgroundSize: "contain",
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              // Default to center if variables aren't set yet
              maskImage: `radial-gradient(circle 250px at var(--p-x, 50%) var(--p-y, 50%), black 0%, black 65%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 250px at var(--p-x, 50%) var(--p-y, 50%), black 0%, black 65%, transparent 100%)`,
            }}
          />
        </div>
      </div>

      {/* 3. SCROLL INDICATOR */}
      {introFinished && (
        <div 
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-4 animate-[fadeIn_1s_ease-in_1s_forwards] opacity-0"
        >
          <span
            className="text-[9px] font-bold tracking-[0.3em] uppercase text-black dark:text-white"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll Down
          </span>
          <div className="w-[1px] h-12 bg-black dark:bg-white" />
        </div>
      )}
    </section>
  );
}