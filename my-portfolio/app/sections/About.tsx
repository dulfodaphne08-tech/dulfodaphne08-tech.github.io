"use client";
import { motion } from "framer-motion";

export default function About() {
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 relative bg-[#f4f4f5]">
      <div className="max-w-7xl mx-auto grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        <motion.div className="min-w-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-black leading-[1.1] tracking-tighter">A little<br/>about me.</h2>
          <p className="text-xl text-gray-600 font-medium mb-6">
            I am Daphne Dulfo, a third-year Bachelor of Science in Information Technology student at Eastern Samar State University.
          </p>
          <p className="text-lg text-gray-600 mb-6 font-medium">
            My interest in technology has grown through hands-on academic projects, where I have learned how to design websites, develop systems, work with databases, and collaborate with a team.
          </p>
          <p className="text-lg text-gray-600 font-medium">
            I am currently building my knowledge in web development and database technologies while exploring different development tools and approaches to problem-solving. I may still be growing as a developer, but I enjoy learning through real projects, challenges, and experimentation.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="min-w-0 bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] border border-gray-200 shadow-2xl flex flex-col justify-center"
        >
          <h3 className="text-sm font-black tracking-widest text-[#FF3366] uppercase mb-10 flex items-center gap-2">
            <span>✨</span> What I Can Bring
          </h3>
          <div className="space-y-8">
            {[
              { title: "Willingness to Learn", desc: "I am open to learning new technologies, tools, and development practices." },
              { title: "Hands-On Experience", desc: "I have gained practical experience through academic projects involving web development, databases, and system development." },
              { title: "Team Collaboration", desc: "I have experience working with teammates to plan, develop, test, and improve projects." },
              { title: "Problem Solving", desc: "I enjoy understanding problems, exploring possible solutions, and learning from mistakes." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h4 className="font-bold text-black text-xl mb-2">{item.title}</h4>
                <p className="text-gray-500 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}