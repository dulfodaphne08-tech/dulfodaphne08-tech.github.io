"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "qr",
    title: "QR-Based Transport Ticketing & Fee Collection System",
    year: "THIRD YEAR",
    role: "BACKEND DEVELOPER / DATABASE ADMINISTRATOR",
    shortDesc: "A web-based academic project developed for transport terminal operations in Borongan City.",
    fullDesc: "A web-based academic project developed for transport terminal operations in Borongan City. The system focuses on managing driver information, QR-based identification, prepaid balances, transport transactions, payment records, vehicle information, and administrative monitoring.",
    tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Supabase", "MySQL", "GitHub"],
    contributions: [
      "Backend-related functionality", 
      "Database management & storage", 
      "Driver and vehicle records management", 
      "Data validation & testing", 
      "Debugging and system integration", 
      "QR-based identification & transaction records"
    ],
    learnings: "This project strengthened my understanding of backend architecture, relational databases, data security, and how to integrate complex systems like QR scanning with a web application.",
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"]
  },
  {
    id: "crochet",
    title: "Crochet Creation System",
    year: "SECOND YEAR",
    role: "SYSTEM DEVELOPER",
    shortDesc: "A web-based academic system designed to manage crochet products, orders, and inventory.",
    fullDesc: "A web-based academic system designed to manage crochet products, orders, and inventory. This project was a major step up from my first year, introducing me to database relationships, user roles, and system design principles.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    contributions: [
      "Designed the user interface and layouts", 
      "Created the database schema for products and orders", 
      "Developed CRUD functionality for inventory", 
      "Implemented user authentication", 
      "Tested system flows and fixed bugs"
    ],
    learnings: "I learned how to connect a frontend interface to a backend database, handle user data securely, and manage the complexities of an e-commerce-style system.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"]
  },
  {
    id: "event",
    title: "Event Planner System",
    year: "FIRST YEAR",
    role: "WEB DEVELOPER",
    shortDesc: "My very first academic web project, built to help users plan and schedule events.",
    fullDesc: "My very first academic web project. This system was built to help users plan and schedule events, track attendees, and manage basic event details. It laid the foundation for my entire IT journey.",
    tech: ["HTML", "CSS", "JavaScript"],
    contributions: [
      "Built the core HTML/CSS structure", 
      "Added basic JavaScript for interactivity", 
      "Created forms for event registration", 
      "Styled the layout for desktop view"
    ],
    learnings: "As my first project, I learned the absolute fundamentals of web development, how the DOM works, and how to collaborate with a team using version control.",
    images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"]
  }
];

export default function FeaturedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setIsArchiveOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="work" className="py-20 md:py-32 bg-[#FAF8F8] dark:bg-[#09090b] text-[#171417] dark:text-white overflow-hidden relative transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 relative z-10">
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] uppercase text-xs mb-3">Selected Work</p>
            <h2 className="text-4xl md:text-7xl font-black text-[#171417] dark:text-white tracking-tighter">Work Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium mt-4 max-w-xl text-sm md:text-base">A collection of systems, digital projects, and technical work I've built.</p>
          </div>
          <button 
            onClick={() => setIsArchiveOpen(true)}
            className="w-full md:w-auto px-6 py-3 bg-[#171417] dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-[#FF3366] dark:hover:bg-[#FF3366] hover:text-white dark:hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2 whitespace-nowrap shadow-lg"
          >
            View More Projects ↗
          </button>
        </div>

        {/* 3D Carousel Area */}
        <div className="relative h-[280px] md:h-[500px] w-full flex items-center justify-center mt-8 md:mt-10 mb-16 md:mb-20 perspective-[1200px]">
          
          {/* Navigation Arrows (Fixed positioning on mobile so they don't overflow) */}
          <button onClick={prevSlide} className="absolute left-2 md:left-10 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 flex items-center justify-center text-black dark:text-white hover:bg-white dark:hover:bg-black transition-colors shadow-xl">
            ←
          </button>
          <button onClick={nextSlide} className="absolute right-2 md:right-10 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 flex items-center justify-center text-black dark:text-white hover:bg-white dark:hover:bg-black transition-colors shadow-xl">
            →
          </button>

          {projects.map((project, index) => {
            const offset = (index - activeIndex + projects.length) % projects.length;
            let position = 0;
            if (offset === 0) position = 0; 
            else if (offset === 1) position = 1; 
            else if (offset === projects.length - 1) position = -1; 
            else position = 2;

            return (
              <motion.div
                key={project.id}
                onClick={() => {
                  if (position === 0) setSelectedProject(project);
                  else setActiveIndex(index);
                }}
                animate={{
                  // Adjusted percentages for better mobile stacking
                  x: position === 0 ? "0%" : position === 1 ? "35%" : position === -1 ? "-35%" : "0%",
                  scale: position === 0 ? 1 : 0.85,
                  opacity: position === 0 ? 1 : position === 2 ? 0 : 0.5,
                  zIndex: position === 0 ? 10 : 5,
                  rotateY: position === 0 ? 0 : position === 1 ? -15 : 15,
                  filter: position === 0 ? "brightness(1)" : "brightness(0.6)",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[85%] md:w-[700px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121214]"
              >
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {position === 0 && (
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                    <span className="px-2 py-1 md:px-3 md:py-1 bg-[#FF3366] text-white text-[10px] md:text-xs font-bold rounded-full mb-2 md:mb-3 inline-block">{project.year}</span>
                    <h3 className="text-lg md:text-3xl font-bold text-white leading-tight line-clamp-2">{project.title}</h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Active Project Description */}
        <div className="text-center max-w-3xl mx-auto min-h-[180px] md:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <h3 className="text-xl md:text-3xl font-bold text-[#171417] dark:text-white mb-3 md:mb-4">{projects[activeIndex].title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base leading-relaxed mb-4 md:mb-6">{projects[activeIndex].shortDesc}</p>
              <button onClick={() => setSelectedProject(projects[activeIndex])} className="text-[#171417] dark:text-white font-bold text-sm md:text-base border-b border-[#171417] dark:border-white pb-1 hover:text-[#FF3366] hover:border-[#FF3366] dark:hover:text-[#FF3366] dark:hover:border-[#FF3366] transition-colors">
                View Project Details →
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ARCHIVE GRID MODAL (View All) */}
      <AnimatePresence>
        {isArchiveOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#FAF8F8] dark:bg-[#09090b] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-20 relative">
              <button 
                onClick={() => setIsArchiveOpen(false)}
                className="absolute top-6 right-5 md:top-8 md:right-12 px-5 md:px-6 py-2 bg-[#171417] dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-[#FF3366] transition-colors text-sm md:text-base"
              >
                Close Archive ✕
              </button>

              <div className="mb-10 md:mb-16">
                <p className="text-[#FF3366] font-bold tracking-[0.2em] uppercase text-xs mb-3">Archive</p>
                <h2 className="text-3xl md:text-6xl font-black text-[#171417] dark:text-white tracking-tighter">All Technical Projects</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm md:text-base">A complete collection of my systems, digital projects, and technical work.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, i) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white dark:bg-[#121214] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="h-40 md:h-48 overflow-hidden relative">
                      <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 md:p-6">
                      <span className="text-[#FF3366] text-xs font-bold uppercase tracking-widest">{project.year}</span>
                      <h3 className="text-lg md:text-xl font-bold text-[#171417] dark:text-white mt-2 mb-2 md:mb-3 leading-tight">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{project.shortDesc}</p>
                      <div className="mt-4 md:mt-6 flex items-center text-sm font-bold text-[#171417] dark:text-white">
                        View Details <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-8 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-gray-800 w-full max-w-5xl rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl my-auto relative text-[#171417] dark:text-white"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#FF3366] transition-colors font-bold text-lg md:text-xl">
                ✕
              </button>

              <div className="relative h-[200px] md:h-[400px] w-full">
                <img src={selectedProject.images[0]} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121214] via-white/40 dark:via-[#121214]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-[#FF3366] text-white text-[10px] md:text-xs font-bold rounded-full mb-2 md:mb-4 inline-block uppercase tracking-widest">
                    {selectedProject.year} · {selectedProject.role}
                  </span>
                  <h2 className="text-2xl md:text-5xl font-black text-[#171417] dark:text-white leading-tight">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-5 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Project Overview</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8">{selectedProject.fullDesc}</p>
                    <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 md:px-4 md:py-2 bg-[#f4f4f5] dark:bg-[#1a1a1f] border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl text-xs md:text-sm font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Key Contributions</h4>
                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {selectedProject.contributions.map((c, i) => (
                        <li key={i} className="flex gap-2 md:gap-3 text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                          <span className="text-[#FF3366] font-black">✓</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 md:mt-8 p-4 md:p-6 bg-[#f4f4f5] dark:bg-[#1a1a1f] border border-gray-200 dark:border-gray-800 rounded-xl md:rounded-2xl">
                  <h4 className="text-base md:text-lg font-bold mb-2">What I Learned</h4>
                  <p className="text-gray-600 dark:text-gray-400 italic text-xs md:text-sm leading-relaxed">"{selectedProject.learnings}"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}