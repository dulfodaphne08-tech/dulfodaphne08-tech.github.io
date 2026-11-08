"use client";
import { motion } from "framer-motion";

export default function Resume() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#f4f4f5] text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-black tracking-tight">Want to Know More?</h2>
          <p className="text-gray-600 font-medium text-base sm:text-lg mb-8 sm:mb-10">For a more detailed overview of my education, skills, achievements, and project experience, you can view my resume.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button data-magnetic className="px-10 py-5 bg-[#111] text-white font-black rounded-full hover:scale-105 hover:bg-[#FF3366] transition-all shadow-xl">
              View Resume →
            </button>
            <button data-magnetic className="px-10 py-5 bg-white text-black border border-gray-300 font-black rounded-full hover:scale-105 transition-all shadow-lg">
              Download Resume ↓
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}