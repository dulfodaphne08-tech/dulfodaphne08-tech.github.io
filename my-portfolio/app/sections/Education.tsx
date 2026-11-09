"use client";
import { motion } from "framer-motion";

const timelineData = [
  // Education
  { type: "Education", year: "2024 — Present", title: "Eastern Samar State University", desc: "Bachelor of Science in Information Technology · 3rd Year", icon: "🏫" },
  { type: "Education", year: "Senior High School", title: "HUMSS", desc: "Grade 12 — With High Honors · Grade 11 — With Honors", icon: "📚" },
  { type: "Education", year: "Junior High School", title: "Grades 7–10", desc: "With Honors", icon: "📖" },
  { type: "Education", year: "Elementary", title: "Graduated With Honors", desc: "", icon: "🎒" },
  // Achievements
  { type: "Achievement", year: "Grade 11 & 12", title: "Athlete of the Year", desc: "", icon: "🏅" },
  { type: "Achievement", year: "Grade 12", title: "With High Honors", desc: "", icon: "🎓" },
  { type: "Achievement", year: "Grade 11", title: "With Honors", desc: "", icon: "🎓" },
  { type: "Achievement", year: "Grades 7–10", title: "With Honors", desc: "", icon: "🏆" },
  { type: "Achievement", year: "Elementary", title: "Graduated With Honors", desc: "", icon: "🏆" },
];

export default function Education() {
  return (
    <section id="journey" className="relative py-24 bg-transparent overflow-hidden transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter">
            Education & Achievements
          </h2>
        </motion.div>

        <div className="relative">
          {/* Central Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-[#26262A] -translate-x-1/2" />

          <div className="space-y-12">
            {timelineData.map((item, i) => {
              const isLeft = i % 2 === 0;
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center w-full ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Desktop layout */}
                  <div className={`hidden md:flex w-1/2 ${isLeft ? "pr-12 justify-end text-right" : "pl-12 justify-start text-left order-last"}`}>
                    <div className="w-full max-w-sm">
                      <span className="inline-block px-3 py-1 bg-white dark:bg-[#171719] border border-gray-200 dark:border-[#26262A] text-xs font-bold text-gray-500 dark:text-[#85858C] rounded-full mb-2">
                        {item.year}
                      </span>
                      <h4 className="text-xl font-bold text-black dark:text-white">{item.title}</h4>
                      {item.desc && <p className="text-gray-600 dark:text-[#85858C] text-sm mt-1">{item.desc}</p>}
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 md:top-1 w-8 h-8 rounded-full bg-[#f4f4f5] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
                    <span className="text-sm">{item.icon}</span>
                  </div>

                  {/* Mobile layout */}
                  <div className="w-full pl-16 md:hidden">
                    <span className="inline-block px-3 py-1 bg-white dark:bg-[#171719] border border-gray-200 dark:border-[#26262A] text-xs font-bold text-gray-500 dark:text-[#85858C] rounded-full mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-black dark:text-white">{item.title}</h4>
                    {item.desc && <p className="text-gray-600 dark:text-[#85858C] text-sm mt-1">{item.desc}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}