"use client";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#f4f4f5]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold mb-12 md:mb-16 text-center text-black tracking-tighter">Technical Skills</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl transition-shadow">
            <h3 className="font-black text-[#FF3366] mb-6 uppercase tracking-widest text-sm">Web Dev</h3>
            <ul className="space-y-3 text-black font-bold text-lg">
              <li className="flex items-center gap-2">🟧 HTML</li>
              <li className="flex items-center gap-2">🟦 CSS</li>
              <li className="flex items-center gap-2">🟨 JavaScript</li>
              <li className="flex items-center gap-2">🌊 Tailwind CSS</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl transition-shadow">
            <h3 className="font-black text-[#FF3366] mb-6 uppercase tracking-widest text-sm">Database</h3>
            <ul className="space-y-3 text-black font-bold text-lg">
              <li className="flex items-center gap-2">🐬 MySQL</li>
              <li className="flex items-center gap-2">⚡ Supabase</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl transition-shadow">
            <h3 className="font-black text-[#FF3366] mb-6 uppercase tracking-widest text-sm">Tools</h3>
            <ul className="space-y-3 text-black font-bold text-lg">
              <li className="flex items-center gap-2">💻 VS Code</li>
              <li className="flex items-center gap-2">🐙 GitHub</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl transition-shadow">
            <h3 className="font-black text-[#FF3366] mb-6 uppercase tracking-widest text-sm">AI Tools</h3>
            <ul className="space-y-3 text-black font-bold text-lg">
              <li className="flex items-center gap-2">✨ Gemini</li>
              <li className="flex items-center gap-2">🐋 DeepSeek</li>
            </ul>
          </motion.div>
        </div>
        <p className="text-center text-sm font-medium text-gray-500 max-w-2xl mx-auto bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          I use AI-assisted tools as learning and development aids for research, debugging, understanding concepts, and exploring possible solutions.
        </p>
      </div>
    </section>
  );
}