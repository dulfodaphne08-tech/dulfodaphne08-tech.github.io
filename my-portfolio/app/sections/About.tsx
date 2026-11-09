"use client";
import { motion, Variants } from "framer-motion"; // <-- 1. Import Variants

export default function About() {
  // 2. Add the type ': Variants' here
  const panelVariants: Variants = {
    hiddenLeft: { opacity: 0, x: -80 },
    hiddenRight: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section id="about" className="relative py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left "Door" Panel */}
          <motion.div 
            variants={panelVariants}
            initial="hiddenLeft" 
            whileInView="visible" 
            // Removed 'as any' to keep it clean, it should work now!
            viewport={{ once: true, margin: "-100px" }} 
            className="text-left order-2 lg:order-1"
          >
            <h3 className="text-3xl md:text-5xl font-black text-black dark:text-white leading-tight mb-6">
              <span className="text-[#FF3366]">Hi, I'm</span><br />
              Daphne Dulfo
            </h3>
            <p className="text-gray-600 dark:text-[#85858C] font-medium text-lg">
              A 3rd Year BSIT Student at Eastern Samar State University.
            </p>
          </motion.div>

          {/* Center Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-[#26262A] shadow-2xl order-1 lg:order-2"
          >
            <img 
              src="/picture.png" 
              alt="Daphne Dulfo" 
              className="w-full h-full object-cover object-top transition-all duration-500" 
            />
          </motion.div>

          {/* Right "Door" Panel */}
          <motion.div 
            variants={panelVariants}
            initial="hiddenRight" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            className="text-left lg:text-right order-3"
          >
            <p className="text-gray-600 dark:text-[#85858C] font-medium text-lg leading-relaxed mb-6">
              My interest in technology has grown through hands-on academic projects, where I have learned how to design websites, develop systems, work with databases, and collaborate with a team.
            </p>
            <p className="text-gray-600 dark:text-[#85858C] font-medium text-lg leading-relaxed">
              I may still be growing as a developer, but I enjoy learning through real projects, challenges, and experimentation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}