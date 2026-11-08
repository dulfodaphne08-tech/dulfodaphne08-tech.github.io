"use client";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useState, useEffect, useRef, PointerEvent } from "react";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const pictureSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/picture.png`;
  const containerRef = useRef<HTMLDivElement>(null);
  const touchTimer = useRef<number | null>(null);
  const colorActiveRef = useRef(false);
  const [colorActive, setColorActive] = useState(false);
  const pointerX = useSpring(0, { stiffness: 180, damping: 24 });
  const pointerY = useSpring(0, { stiffness: 180, damping: 24 });
  const revealSize = useSpring(180, { stiffness: 180, damping: 24 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${revealSize}px at ${pointerX}px ${pointerY}px, black 0%, black 65%, transparent 100%)`;

  const setColorReveal = (active: boolean) => {
    if (colorActiveRef.current === active) return;
    colorActiveRef.current = active;
    setColorActive(active);
  };

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
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => {
      window.clearTimeout(timer);
      if (touchTimer.current !== null) window.clearTimeout(touchTimer.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#f4f4f5] z-[100] flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl mb-2 text-black">Daphne Dulfo</h1>
        <div className="w-64 h-[2px] bg-gray-300 relative overflow-hidden mt-6">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute inset-0 bg-[#FF3366]" />
        </div>
      </div>
    );
  }

  return (
    <section className="hero-section relative isolate min-h-[100svh] overflow-x-clip bg-[#f4f4f5] px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32">
      <div aria-hidden="true" className="hero-wordmark pointer-events-none absolute inset-x-0 z-[1] overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
          className="hero-wordmark-track flex w-max whitespace-nowrap"
        >
          {[0, 1].map((copy) => (
            <h1
              key={copy}
              className="hero-wordmark-copy text-[clamp(4.5rem,14vw,13rem)] leading-none tracking-tighter text-black/[0.10]"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif", fontWeight: 400 }}
            >
              DAPHNE. &nbsp;&nbsp; DAPHNE. &nbsp;&nbsp; DAPHNE. &nbsp;&nbsp;
            </h1>
          ))}
        </motion.div>
      </div>
      <div className="hero-layout relative z-10 mx-auto w-full max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-intro z-30"
        >
          <div className="rounded-3xl border border-gray-200 bg-white/95 p-5 text-center shadow-xl backdrop-blur-md sm:p-6">
            <h2
              className="mb-2 text-2xl leading-tight text-black sm:text-3xl"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
                fontWeight: 900
              }}
            >
              3rd Year <br /> BSIT Student
            </h2>
            <p
              className="mb-0 text-sm text-gray-800 sm:text-base"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
                fontWeight: 500,
                letterSpacing: "0.05em"
              }}
            >
              Aspiring IT Professional
            </p>
          </div>
        </motion.div>

        <div className="hero-portrait relative z-10 flex min-w-0 justify-center">
          <motion.div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => setColorReveal(false)}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setColorReveal(false);
            }}
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hero-portrait-frame relative flex w-[min(82vw,420px)] max-w-full items-center justify-center touch-pan-y"
          >
            <img
              src={pictureSrc}
              alt="Daphne"
              className="relative z-10 block h-auto w-full object-contain grayscale drop-shadow-2xl"
            />
            <motion.div
              data-color-reveal
              className="pointer-events-none absolute inset-0 z-20"
              animate={{ opacity: colorActive ? 1 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                backgroundImage: `url('${pictureSrc}')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                maskImage,
                WebkitMaskImage: maskImage
              }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-actions flex w-full max-w-[360px] flex-col gap-3"
        >
          <a href="#work" data-magnetic className="min-h-12 rounded-full bg-[#FF3366] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-105">
            View My Work →
          </a>
          <a href="#contact" data-magnetic className="min-h-12 rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero-social z-30 w-full"
        >
          <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-gray-300 bg-white/90 p-4 shadow-2xl backdrop-blur-md xl:max-w-[240px]">
            <p className="mb-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#FF3366]">Connect with me</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-2">
              <a href="mailto:dulfodaphne08@gmail.com" className="flex items-center gap-2 text-xs font-bold transition-colors hover:text-[#FF3366]">📧 Email</a>
              <a href="https://github.com/dulfodaphne08-tech" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold transition-colors hover:text-[#FF3366]">💻 GitHub</a>
              <a href="https://www.facebook.com/share/19c8UTaNGX/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold transition-colors hover:text-[#FF3366]">📘 Facebook</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}