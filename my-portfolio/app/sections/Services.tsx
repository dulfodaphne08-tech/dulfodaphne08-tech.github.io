"use client";
import { motion } from "framer-motion";

const services = [
  { icon: "🌐", title: "Web Development", desc: "Building responsive web interfaces using HTML, CSS, JavaScript, and Tailwind CSS." },
  { icon: "🗄️", title: "Database & Data", desc: "Working with databases and data management using MySQL and Supabase." },
  { icon: "🧩", title: "System Development", desc: "Developing academic systems that address specific user and organizational requirements." },
  { icon: "🤝", title: "Collaborative Dev", desc: "Working with teammates to plan, develop, test, and improve projects." },
];

export default function Services() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter text-black">What I Work With</motion.h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto text-center">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="p-6 sm:p-8 bg-[#f4f4f5] border border-gray-200 rounded-[2rem] hover:border-[#FF3366] hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="text-5xl mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform origin-left">{s.icon}</div>
              <h3 className="text-xl font-black mb-4 text-black">{s.title}</h3>
              <p className="text-gray-600 font-medium text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}