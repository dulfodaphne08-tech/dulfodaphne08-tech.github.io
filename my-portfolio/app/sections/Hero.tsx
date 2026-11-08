"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useState, useEffect, useRef, PointerEvent } from "react";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const pictureSrc = "/picture.png";
  const containerRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<number | null>(null);
  
  const pointerX = useSpring(0, { stiffness: 180, damping: 24 });
  const pointerY = useSpring(0, { stiffness: 180, damping: 24 });
  const revealSize = useSpring(180, { stiffness: 180, damping: 24 });
  const [colorActive, setColorActive] = useState(false);

  const maskImage = useMotionTemplate`radial-gradient(circle ${revealSize}px at ${pointerX}px ${pointerY}px, black 0%, black 65%, transparent 100%)`;

  const setColorReveal = (active: boolean) => setColorActive(active);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
    revealSize.set(e.pointerType === "touch" ? 90 : 250);
    if (e.pointerType === "mouse") setColorReveal(true);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      handlePointerMove(e);
      setColorReveal(true);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
      touchTimer.current = window.setTimeout(() => setColorReveal(false), 650);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => {
      window.clearTimeout(timer);
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    };
  }, []);

  if (loading) return null; 

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-transparent flex flex-col justify-end items-center">
      
      {/* Background text - FIXED DARK MODE VISIBILITY */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 pointer-events-none overflow-hidden flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[0, 1, 2, 3].map((copy) => (
            <h1 
              key={copy} 
              // FIX: Changed to text-black/10 (light mode) and dark:text-white/10 (dark mode) so it's ALWAYS visible
              className="hero-wordmark-copy text-[clamp(7rem,18vw,22rem)] font-black uppercase tracking-tighter text-black/10 dark:text-white/10 leading-none pr-12 select-none"
            >
              DAPHNE
            </h1>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 w-full flex justify-center mt-auto">
        <motion.div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setColorReveal(false)}
          onPointerLeave={(e) => { if (e.pointerType === "mouse") setColorReveal(false); }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[95vw] md:w-[70vw] max-w-[800px] h-[75vh] md:h-[85vh] cursor-crosshair"
        >
          <img src={pictureSrc} alt="Daphne" className="absolute inset-0 w-full h-full object-contain object-bottom grayscale drop-shadow-2xl" />
          
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            animate={{ opacity: colorActive ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              backgroundImage: `url('${pictureSrc}')`,
              backgroundSize: "contain",
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              maskImage,
              WebkitMaskImage: maskImage
            }}
          />
        </motion.div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-4">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-500 dark:text-white" style={{ writingMode: 'vertical-rl' }}>
          Scroll Down
        </span>
        <div className="w-[1px] h-12 bg-gray-300 dark:bg-white" />
      </div>

    </section>
  );
}