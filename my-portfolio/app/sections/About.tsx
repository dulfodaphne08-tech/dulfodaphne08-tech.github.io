"use client";
import { motion, type Variants } from "framer-motion";

const educationData = [
  { year: "2024 — Present", title: "Eastern Samar State University", desc: "Bachelor of Science in Information Technology · 3rd Year", icon: "1" },
  { year: "Senior High School", title: "HUMSS", desc: "Grade 12 — With High Honors · Grade 11 — With Honors", icon: "2" },
  { year: "Junior High School", title: "Grades 7–10", desc: "With Honors", icon: "3" },
  { year: "Elementary", title: "Graduated With Honors", desc: "", icon: "4" },
];

const achievementsData = [
  { year: "Grade 11 & 12", title: "Athlete of the Year", desc: "", icon: "🏅" },
  { year: "Grade 12", title: "With High Honors", desc: "", icon: "🎓" },
  { year: "Grade 11", title: "With Honors", desc: "", icon: "🎓" },
  { year: "Grades 7–10", title: "With Honors", desc: "", icon: "🏆" },
  { year: "Elementary", title: "Graduated With Honors", desc: "", icon: "🏆" },
];

export default function About() {
  // The "Closing Door" Animation
  const doorLeftVariants: Variants = {
    hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const doorRightVariants: Variants = {
    hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 } 
    },
  };

  const centerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="relative pt-24 pb-24 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- ABOUT ME TITLE --- */}
        <div className="text-center mb-16 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter"
          >
            About Me
          </motion.h2>
        </div>

        {/* 3-Column Layout: Left Text, Center Image, Right Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24">
          
          {/* LEFT SIDE: Text */}
          <motion.div 
            variants={doorLeftVariants}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            className="text-left order-2 lg:order-1 lg:col-span-3 flex flex-col justify-center will-change-transform transform-gpu"
          >
            <h3 className="text-4xl xl:text-5xl font-black text-black dark:text-white leading-[1.15] mb-6">
              <span className="text-[#FF3366]">Hi, I'm</span><br />
              Daphne Dulfo
            </h3>
            <p className="text-gray-600 dark:text-[#85858C] font-medium text-lg leading-relaxed">
              A 3rd Year BSIT Student at Eastern Samar State University.
            </p>
          </motion.div>

          {/* CENTER: Image */}
          <motion.div 
            variants={centerVariants}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="relative mx-auto w-full max-w-[450px] lg:max-w-full order-1 lg:order-2 lg:col-span-6 will-change-transform transform-gpu flex justify-center"
          >
            <img 
              src="/picturee.png" 
              alt="Daphne Dulfo" 
              className="w-full h-auto object-cover drop-shadow-2xl" 
            />
          </motion.div>

          {/* RIGHT SIDE: Text */}
          <motion.div 
            variants={doorRightVariants}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            className="text-left lg:text-right order-3 lg:col-span-3 flex flex-col justify-center will-change-transform transform-gpu"
          >
            <p className="text-gray-600 dark:text-[#85858C] font-medium text-lg leading-relaxed mb-6">
              My interest in technology has grown through hands-on academic projects, where I have learned how to design websites, develop systems, work with databases, and collaborate with a team.
            </p>
            <p className="text-gray-600 dark:text-[#85858C] font-medium text-lg leading-relaxed">
              I may still be growing as a developer, but I enjoy learning through real projects, challenges, and experimentation.
            </p>
          </motion.div>
        </div>

        {/* --- EDUCATION & ACHIEVEMENTS TIMELINE --- */}
        <div id="education" className="pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white uppercase tracking-tighter">
              Education & Achievements
            </h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <div className="relative grid grid-cols-2 gap-x-8 md:gap-x-16">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-[#26262A] -translate-x-1/2 h-full" />

              {/* Left Column */}
              <div className="space-y-12 pb-12">
                <h3 className="text-xl font-bold text-black dark:text-white mb-6 sticky top-0 bg-[#f4f4f5] dark:bg-[#0B0B0D] py-2 z-10">
                  Education
                </h3>
                {educationData.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    className="relative pr-8 text-right"
                  >
                    <span className="inline-block px-3 py-1 bg-transparent border border-gray-200 dark:border-[#26262A] text-xs font-bold text-gray-500 dark:text-[#85858C] rounded-full mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-bold text-black dark:text-white">{item.title}</h4>
                    {item.desc && <p className="text-gray-600 dark:text-[#85858C] text-sm mt-1">{item.desc}</p>}
                    
                    <div className="absolute right-[-16px] top-2 w-8 h-8 rounded-full bg-[#f4f4f5] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-black dark:text-white">{item.icon}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-12 pb-12">
                <h3 className="text-xl font-bold text-black dark:text-white mb-6 sticky top-0 bg-[#f4f4f5] dark:bg-[#0B0B0D] py-2 z-10">
                  Achievements
                </h3>
                {achievementsData.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    className="relative pl-8 text-left"
                  >
                    <span className="inline-block px-3 py-1 bg-transparent border border-gray-200 dark:border-[#26262A] text-xs font-bold text-gray-500 dark:text-[#85858C] rounded-full mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-bold text-black dark:text-white">{item.title}</h4>
                    {item.desc && <p className="text-gray-600 dark:text-[#85858C] text-sm mt-1">{item.desc}</p>}
                    
                    <div className="absolute left-[-16px] top-2 w-8 h-8 rounded-full bg-[#f4f4f5] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
                      <span className="text-sm">{item.icon}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}