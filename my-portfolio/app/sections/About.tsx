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
  // Text Stagger Animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Transparent Image Reveal Animation
  const imageVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  return (
    <section id="about" className="relative pt-32 pb-24 bg-[#FAF8F8] dark:bg-[#0B0B0D] overflow-hidden">
      
      {/* Subtle ambient glow behind the section */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#FF386F]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- ABOUT ME HEADING --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[#FF386F] font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Get To Know Me
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-[#171417] dark:text-white uppercase tracking-tighter" style={{ fontFamily: "var(--font-playfair)" }}>
            About Me
          </h2>
        </motion.div>

        {/* --- MAIN ABOUT ME LAYOUT (2 Columns) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* LEFT COLUMN: Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            className="flex flex-col justify-center"
          >
            <motion.h3 variants={itemVariants} className="text-5xl md:text-6xl font-black text-[#171417] dark:text-white leading-[1.1] mb-4 tracking-tight">
              <span className="text-[#FF386F]">Hi, I'm</span><br />
              Daphne Dulfo.
            </motion.h3>

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xl font-bold text-[#171417] dark:text-white">3rd-Year BSIT Student</p>
              <p className="text-lg text-[#66616B] dark:text-gray-400 font-medium">Aspiring Web Developer</p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[#66616B] dark:text-gray-400 text-lg leading-relaxed mb-6 text-justify lg:text-left">
              I'm a Bachelor of Science in Information Technology student at Eastern Samar State University with a growing passion for web development, technology, and creative problem-solving.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-[#66616B] dark:text-gray-400 text-lg leading-relaxed mb-6 text-justify lg:text-left">
              Through academic projects and hands-on experiences, I've explored building websites, developing systems, working with databases, and creating user-friendly digital solutions.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-[#66616B] dark:text-gray-400 text-lg leading-relaxed mb-8 text-justify lg:text-left">
              I enjoy transforming ideas into functional and visually appealing experiences. I'm continuously learning, improving my programming skills, and challenging myself to become a better developer.
            </motion.p>

            <motion.div variants={itemVariants} className="p-6 bg-[#FFFFFF] dark:bg-[#121214] border-l-4 border-[#FF386F] rounded-r-2xl shadow-sm mb-10">
              <p className="text-[#171417] dark:text-white font-medium italic text-lg m-0">
                "My goal is to create meaningful digital experiences through creativity, innovation, and technology."
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#171417] dark:bg-white text-white dark:text-[#171417] font-bold rounded-full hover:bg-[#FF386F] dark:hover:bg-[#FF386F] hover:text-white transition-all duration-300 shadow-xl">
                Let's Work Together
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Transparent Portrait Image */}
          <div className="relative flex justify-center items-center">
            {/* Soft ambient glow behind the transparent image */}
            <div className="absolute inset-0 bg-[#FF386F]/15 blur-[80px] rounded-full scale-75 pointer-events-none" />
            
            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative w-full max-w-[550px] lg:max-w-full"
            >
              {/* No borders, no background boxes, just the image */}
              <img 
                src="/picturee.png" 
                alt="Daphne Dulfo" 
                className="w-full h-auto object-contain drop-shadow-2xl" 
              />
            </motion.div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* EDUCATION & ACHIEVEMENTS (UNTOUCHED AS REQUESTED)          */}
        {/* ========================================================= */}
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
                <h3 className="text-xl font-bold text-black dark:text-white mb-6 sticky top-0 bg-[#FAF8F8] dark:bg-[#0B0B0D] py-2 z-10">
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
                    
                    <div className="absolute right-[-16px] top-2 w-8 h-8 rounded-full bg-[#FAF8F8] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-black dark:text-white">{item.icon}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-12 pb-12">
                <h3 className="text-xl font-bold text-black dark:text-white mb-6 sticky top-0 bg-[#FAF8F8] dark:bg-[#0B0B0D] py-2 z-10">
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
                    
                    <div className="absolute left-[-16px] top-2 w-8 h-8 rounded-full bg-[#FAF8F8] dark:bg-[#0B0B0D] border-2 border-[#FF3366] flex items-center justify-center z-10">
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