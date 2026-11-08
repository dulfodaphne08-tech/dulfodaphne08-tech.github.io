"use client";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Understand", desc: "Understand the requirements and identify the core problem." },
  { num: "02", title: "Plan", desc: "Think about the pages, features, data, and overall structure." },
  { num: "03", title: "Build", desc: "Develop the interface and system functionality." },
  { num: "04", title: "Test", desc: "Check features, identify errors, and fix problems." },
  { num: "05", title: "Improve", desc: "Refine the design, functionality, and user experience." },
  { num: "06", title: "Learn", desc: "Document what worked, what didn't, and what I can improve next time." },
];

export default function Workflow() {
  return (
    <section id="journey" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl mb-6 text-black"
          >
            How I Approach a Project
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium text-base sm:text-lg md:text-xl text-center"
          >
            My step-by-step development process from initial idea to final deployment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#f4f4f5] p-6 sm:p-8 md:p-10 rounded-[2rem] border border-gray-200 relative overflow-hidden group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Giant Number - Tucked away in the corner */}
              <span className="text-[120px] font-black text-black/[0.04] absolute -top-4 -right-4 group-hover:text-[#FF3366]/[0.05] transition-colors duration-500 pointer-events-none leading-none select-none">
                {step.num}
              </span>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#FF3366] font-black mb-6 group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mb-3 text-black group-hover:text-[#FF3366] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}