"use client";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { value: "3rd Year", label: "BSIT Student" },
    { value: "3+", label: "Academic Projects" },
    { value: "2024–Present", label: "College Journey" },
    { value: "Continuous", label: "Learning" },
  ];

  return (
    <section className="border-y border-gray-200 bg-white relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="min-w-0 p-4 sm:p-6 md:p-10 text-center hover:bg-[#f4f4f5] transition-colors group cursor-default"
          >
            <h3 className="text-lg sm:text-2xl md:text-3xl font-black mb-2 text-black group-hover:text-[#FF3366] transition-colors">{stat.value}</h3>
            <p className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-gray-500 uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}