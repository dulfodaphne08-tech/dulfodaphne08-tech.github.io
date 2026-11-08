"use client";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#f4f4f5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-12 md:mb-20 text-center text-black tracking-tighter">My Background</h2>
        
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Education Column */}
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-black mb-8 text-black border-b-2 border-gray-300 pb-4">Education</h3>
            <div className="space-y-8">
              {[
                { year: "2024 — Present", title: "Eastern Samar State University", desc: "Bachelor of Science in Information Technology (3rd Year)" },
                { year: "Senior High School", title: "HUMSS", desc: "Grade 12 (High Honors) | Grade 11 (Honors)" },
                { year: "Junior High School", title: "Grades 7–10", desc: "With Honors" },
                { year: "Elementary", title: "Graduated With Honors", desc: "" },
              ].map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-4 border-[#FF3366]">
                  <span className="text-sm font-black text-[#FF3366] uppercase tracking-widest block mb-2">{edu.year}</span>
                  <h4 className="text-xl font-bold text-black">{edu.title}</h4>
                  <p className="text-gray-500 font-medium">{edu.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Column */}
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-black mb-8 text-black border-b-2 border-gray-300 pb-4">Achievements</h3>
            <div className="space-y-4">
              {[
                { icon: "🏆", title: "Academic Excellence", sub: "With Honors (Elementary)" },
                { icon: "🏆", title: "Consistent Honors", sub: "With Honors (Grades 7–10)" },
                { icon: "🎓", title: "Senior High Achievement", sub: "With Honors (Grade 11)" },
                { icon: "🎓", title: "Senior High Achievement", sub: "With High Honors (Grade 12)" },
                { icon: "🏅", title: "Athlete of the Year", sub: "Grade 11 & Grade 12" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#FF3366] transition-colors">
                  <div className="shrink-0 text-3xl">{a.icon}</div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-black">{a.title}</h4>
                    <p className="text-sm text-gray-500 font-medium">{a.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}