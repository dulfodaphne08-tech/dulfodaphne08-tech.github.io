"use client";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="journey" className="relative py-24 bg-transparent overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter">
            Education & Achievements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          
          {/* Vertical Divider Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-[#26262A] -translate-x-1/2" />

          {/* Left Column: Education */}
          <div className="space-y-10">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Education</h3>
            
            {[
              { year: "2024 — Present", title: "Eastern Samar State University", desc: "Bachelor of Science in Information Technology · 3rd Year" },
              { year: "Senior High School", title: "HUMSS", desc: "Grade 12 — With High Honors · Grade 11 — With Honors" },
              { year: "Junior High School", title: "Grades 7–10", desc: "With Honors" },
              { year: "Elementary", title: "Graduated With Honors", desc: "" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#f4f4f5] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold text-black dark:text-white">{i + 1}</span>
                </div>
                <div className="absolute left-[11px] top-7 bottom-[-40px] w-[2px] bg-gray-200 dark:bg-[#26262A] last:hidden" />
                
                <span className="inline-block px-3 py-1 bg-white dark:bg-[#171719] border border-gray-200 dark:border-[#26262A] text-xs font-bold text-gray-500 dark:text-[#85858C] rounded-full mb-2">
                  {item.year}
                </span>
                <h4 className="text-xl font-bold text-black dark:text-white">{item.title}</h4>
                <p className="text-gray-600 dark:text-[#85858C] text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Achievements */}
          <div className="space-y-10">
             <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Achievements</h3>
             
             {[
               { title: "Athlete of the Year", desc: "Grade 11 & Grade 12", icon: "🏅" },
               { title: "With High Honors", desc: "Grade 12", icon: "🎓" },
               { title: "With Honors", desc: "Grade 11", icon: "🎓" },
               { title: "With Honors", desc: "Grades 7–10", icon: "🏆" },
               { title: "Graduated With Honors", desc: "Elementary", icon: "🏆" },
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                 className="relative pl-8"
               >
                 <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#f4f4f5] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
                   <span className="text-[10px] font-bold text-black dark:text-white">{i + 1}</span>
                 </div>
                 <div className="absolute left-[11px] top-7 bottom-[-40px] w-[2px] bg-gray-200 dark:bg-[#26262A] last:hidden" />

                 <div className="flex items-center gap-3 mb-1">
                   <span className="text-xl">{item.icon}</span>
                   <h4 className="text-lg font-bold text-black dark:text-white">{item.title}</h4>
                 </div>
                 <p className="text-gray-600 dark:text-[#85858C] text-sm">{item.desc}</p>
               </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}