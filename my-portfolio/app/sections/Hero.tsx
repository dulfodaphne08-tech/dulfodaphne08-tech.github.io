"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useState, useEffect, useRef, PointerEvent } from "react";

export default function Hero() {
  const pictureSrc = "/picture.png";
  const containerRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<number | null>(null);

  const pointerX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.35 });
  const pointerY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.35 });
  const revealSize = useSpring(180, { stiffness: 140, damping: 22, mass: 0.4 });
  const [colorActive, setColorActive] = useState(false);

  const maskImage = useMotionTemplate`radial-gradient(circle ${revealSize}px at ${pointerX}px ${pointerY}px, black 0%, black 65%, transparent 100%)`;

  const setColorReveal = (active: boolean) => setColorActive(active);

  const updatePointer = (e: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
    revealSize.set(e.pointerType === "touch" ? 110 : 250);
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

  useEffect(() => {
    // Force page to load at the very top
    window.scrollTo(0, 0);
    return () => {
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    };
  }, []);

  return (
    // Added transform-gpu and will-change-transform to force smooth rendering
    <section className="hero-section relative w-full h-[100svh] overflow-hidden bg-transparent flex flex-col justify-end items-center transform-gpu will-change-transform">
      
      {/* BACKGROUND NAME */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center">
        <motion.div
          animate={{ x: ["0%", "-15%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", times: [0, 0.02, 1] }}
          className="flex whitespace-nowrap will-change-transform transform-gpu"
        >
          {[0, 1, 2, 3].map((copy) => (
            <h1
              key={copy}
              className="hero-wordmark-copy text-[20vw] md:text-[18vw] font-black uppercase tracking-[-0.04em] leading-none select-none text-black dark:text-white pr-10 md:pr-20"
              aria-hidden="true"
            >
              DAPHNE DULFO
            </h1>
          ))}
        </motion.div>
      </div>

      {/* PICTURE */}
      <div className="relative z-10 w-full flex justify-center items-end mt-auto pb-0 md:pb-0">
        <motion.div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setColorReveal(false)}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setColorReveal(false);
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1, delay: 0.1 }}
          className="relative w-full md:w-[72vw] max-w-none md:max-w-[860px] h-[75svh] md:h-[85vh] cursor-crosshair touch-pan-y will-change-transform transform-gpu"
        >
          <img
            src={pictureSrc}
            alt="Daphne"
            className="absolute inset-0 w-full h-full object-contain object-bottom grayscale drop-shadow-2xl"
            draggable={false}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            animate={{ opacity: colorActive ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              backgroundImage: `url('${pictureSrc}')`,
              backgroundSize: "contain",
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              maskImage,
              WebkitMaskImage: maskImage,
            }}
          />
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-4">
        <span
          className="text-[9px] font-bold tracking-[0.3em] uppercase text-black dark:text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll Down
        </span>
        <div className="w-[1px] h-12 bg-black dark:bg-white" />
      </div>
    </section>
  );
}