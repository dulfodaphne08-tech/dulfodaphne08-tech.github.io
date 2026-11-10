"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300); // Small pause before exiting
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5; // Faster load
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          // z-[99999] ensures it covers EVERYTHING, bg ensures no transparency
          className="fixed inset-0 z-[99999] bg-[#f4f4f5] dark:bg-[#09090b] flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black dark:text-white mb-10"
            style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          >
            Daphne Dulfo
          </motion.h1>

          <div className="w-64 md:w-96 h-1.5 bg-gray-300 dark:bg-[#26262A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#FF3366]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
          
          <span className="mt-6 text-sm font-bold tracking-widest text-gray-500 uppercase">
            Loading... {Math.min(progress, 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}