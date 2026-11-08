"use client";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState, useEffect, useRef, MouseEvent } from "react";

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const pictureSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/picture.png`;
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, black 100%, transparent 100%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
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
    <section className="min-h-screen relative pt-28 md:pt-32 flex flex-col justify-end overflow-hidden bg-[#f4f4f5]">
      
      {/* 1. GIANT BACKGROUND NAME - MOVED TO TOP & SLOWED DOWN */}
      <div className="absolute top-[15%] left-0 hidden w-full overflow-hidden pointer-events-none z-0 md:flex">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          // Changed duration from 20 to 45 to make it much slower
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="whitespace-nowrap flex"
        >
          <h1 className="text-[22vw] leading-none text-black uppercase tracking-tighter drop-shadow-lg" style={{ fontFamily: "var(--font-anton), Impact, sans-serif", fontWeight: 400 }}>
            DAPHNE DULFO &nbsp;&nbsp;&nbsp; DAPHNE DULFO &nbsp;&nbsp;&nbsp; DAPHNE DULFO &nbsp;&nbsp;&nbsp;
          </h1>
          <h1 className="text-[22vw] leading-none text-black uppercase tracking-tighter drop-shadow-lg" style={{ fontFamily: "var(--font-anton), Impact, sans-serif", fontWeight: 400 }}>
            DAPHNE DULFO &nbsp;&nbsp;&nbsp; DAPHNE DULFO &nbsp;&nbsp;&nbsp; DAPHNE DULFO &nbsp;&nbsp;&nbsp;
          </h1>
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 relative z-10 items-end px-4 sm:px-6">
        
        {/* 2. LEFT TEXT - FIXED CENTERED FONTS */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="md:col-span-3 pb-2 md:pb-24 z-30">
          
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-gray-200 shadow-xl text-center">
            
            {/* CREATIVE HEADER - Italic, Bold, No Shadow */}
            <h2 
              className="text-2xl md:text-3xl mb-2 text-black leading-tight" 
              style={{ 
                fontFamily: "var(--font-playfair), serif", 
                fontStyle: "italic",
                fontWeight: 900
              }}
            >
              3rd Year <br/> BSIT Student
            </h2>
            
            {/* BEAUTIFUL WORDINGS - Italic, Elegant */}
            <p 
              className="text-gray-800 mb-0 text-sm md:text-base" 
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

          <div className="flex w-full max-w-[320px] flex-col gap-3 mt-5 sm:mt-6 mx-auto md:mx-0">
            <a href="#work" className="px-6 py-3 bg-[#FF3366] text-white text-sm rounded-full shadow-lg shadow-pink-500/30 hover:scale-105 transition-transform text-center font-bold">
              View My Work →
            </a>
            <a href="#contact" className="px-6 py-3 bg-black text-white text-sm rounded-full shadow-lg hover:scale-105 transition-transform text-center font-bold">
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* 3. MASSIVE CENTER IMAGE */}
        <div className="md:col-span-6 flex justify-center h-full z-10 relative">
          <motion.div 
            ref={containerRef} 
            onMouseMove={handleMouseMove} 
            initial={{ opacity: 0, scale: 0.9, y: 100 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="w-full max-w-[1000px] h-[40svh] min-h-[280px] max-h-[360px] md:h-screen md:max-h-none relative cursor-none flex items-end justify-center"
          >
            <img 
              src={pictureSrc}
              alt="Daphne" 
              className="w-full h-full object-contain object-bottom grayscale drop-shadow-2xl md:scale-125 origin-bottom"
            />
            <motion.div 
              className="absolute inset-0 w-full h-full z-10 pointer-events-none md:scale-125 origin-bottom"
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

        {/* 4. RIGHT INFO */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="md:col-span-3 pb-8 md:pb-24 flex justify-center md:justify-end z-30">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-gray-300 shadow-2xl w-full max-w-[200px]">
            <p className="text-[10px] font-bold text-[#FF3366] mb-3 uppercase tracking-widest text-left">Connect with me</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:dulfodaphne08@gmail.com" className="text-[11px] font-bold hover:text-[#FF3366] transition-colors flex items-center gap-2">📧 Email</a>
              <a href="https://github.com/dulfodaphne08-tech" target="_blank" rel="noreferrer" className="text-[11px] font-bold hover:text-[#FF3366] transition-colors flex items-center gap-2">💻 GitHub</a>
              <a href="https://www.facebook.com/share/19c8UTaNGX/" target="_blank" rel="noreferrer" className="text-[11px] font-bold hover:text-[#FF3366] transition-colors flex items-center gap-2">📘 Facebook</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}