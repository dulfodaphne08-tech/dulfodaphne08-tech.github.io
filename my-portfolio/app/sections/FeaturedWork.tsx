"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "qr",
    title: "QR-Based Transport Ticketing & Fee Collection System",
    year: "THIRD YEAR",
    role: "BACKEND DEVELOPER / DATABASE ADMINISTRATOR",
    desc: "A web-based academic project developed for transport terminal operations in Borongan City. The system focuses on managing driver information, QR-based identification, prepaid balances, transport transactions, payment records, vehicle information, and administrative monitoring.",
    tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Supabase", "MySQL", "GitHub"],
    contributions: ["Backend-related functionality", "Database management & storage", "Driver and vehicle records management", "Data validation & testing", "Debugging and system integration", "QR-based identification & transaction records"],
    features: ["Secure login for drivers and admins", "QR code generation and scanning for fares", "Real-time prepaid balance tracking", "Detailed transaction history logs", "Admin dashboard for terminal monitoring"],
    learnings: "This project strengthened my understanding of backend architecture, relational databases, data security, and how to integrate complex systems like QR scanning with a web application.",
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"]
  },
  {
    id: "crochet",
    title: "Crochet Creation System",
    year: "SECOND YEAR",
    role: "SYSTEM DEVELOPER",
    desc: "A web-based academic system designed to manage crochet products, orders, and inventory. This project was a major step up from my first year, introducing me to database relationships, user roles, and system design principles.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    contributions: ["Designed the user interface and layouts", "Created the database schema for products and orders", "Developed CRUD functionality for inventory", "Implemented user authentication", "Tested system flows and fixed bugs"],
    features: ["Product catalog with image uploads", "Shopping cart and checkout simulation", "Order management for admins", "Customer account creation"],
    learnings: "I learned how to connect a frontend interface to a backend database, handle user data securely, and manage the complexities of an e-commerce-style system.",
    images: ["https://images.unsplash.com/photo-1615715917286-3fb6bb3eb372?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"]
  },
  {
    id: "event",
    title: "Event Planner System",
    year: "FIRST YEAR",
    role: "WEB DEVELOPER",
    desc: "My very first academic web project. This system was built to help users plan and schedule events, track attendees, and manage basic event details. It laid the foundation for my entire IT journey.",
    tech: ["HTML", "CSS", "JavaScript"],
    contributions: ["Built the core HTML/CSS structure", "Added basic JavaScript for interactivity", "Created forms for event registration", "Styled the layout for desktop view"],
    features: ["Event creation form", "Calendar view for upcoming events", "Attendee list management"],
    learnings: "As my first project, I learned the absolute fundamentals of web development, how the DOM works, and how to collaborate with a team using version control.",
    images: ["https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop"]
  }
];

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedProject) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="work" className="pt-24 sm:pt-28 md:pt-40 pb-20 md:pb-32 bg-[#f4f4f5] border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12 sm:mb-16 md:mb-24 max-w-3xl mx-auto">
          {/* THIS USES THE NEW ANTON FONT */}
          <h2 className="text-[clamp(2.25rem,8vw,4.5rem)] mb-6 text-black">Selected Work</h2>
          <p className="text-gray-500 font-medium text-xl text-center">
            A showcase of the systems I have built throughout my academic journey.
          </p>
        </div>

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="project-row group/project grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {/* Fixed Pink Badge - whitespace-nowrap keeps it on one line */}
                  <span className="px-5 py-2 bg-[#FF3366] text-white text-xs font-black rounded-full tracking-widest uppercase shadow-lg shadow-pink-500/30 whitespace-nowrap">
                    {project.year}
                  </span>
                  <span className="text-gray-500 text-sm font-bold tracking-widest uppercase">{project.role}</span>
                </div>
                
                <h3 className="project-title text-3xl sm:text-4xl md:text-5xl font-normal mb-6 md:mb-8 text-black tracking-tight text-balance">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed font-medium text-base sm:text-lg mb-6 md:mb-10">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
                  {project.tech.map(t => (
                    <span key={t} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-black shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <button 
                  data-magnetic
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelectedProject(project);
                  }}
                  className="min-h-12 px-8 py-3 md:px-10 md:py-5 bg-black text-white font-bold text-base md:text-lg rounded-full hover:bg-[#FF3366] transition-all shadow-xl hover:-translate-y-1 w-full md:w-auto text-center"
                >
                  View Project Details <span className="project-arrow inline-block">→</span>
                </button>
              </div>

              <div className={`relative ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="project-image aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-100"
                >
                  <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover/project:scale-[1.035]" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={() => {
              setSelectedProject(null);
              triggerRef.current?.focus();
            }}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  closeButtonRef.current?.focus();
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="selected-project-title"
              tabIndex={-1}
              className="bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl my-auto"
            >
              <div className="relative h-64 md:h-96 w-full bg-gray-100">
                <img src={selectedProject.images[0]} alt="cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close project details"
                  onClick={() => {
                    setSelectedProject(null);
                    triggerRef.current?.focus();
                  }}
                  className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#FF3366] hover:text-white transition-colors shadow-xl font-black text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 md:px-16 pb-16 -mt-24 relative z-10">
                <span className="inline-block px-5 py-2 bg-[#FF3366] text-white text-xs font-black rounded-full tracking-widest uppercase mb-6 shadow-lg shadow-pink-500/30">
                  {selectedProject.year}
                </span>
                <h2 id="selected-project-title" className="text-4xl md:text-6xl font-normal text-black mb-4 tracking-tighter text-balance">{selectedProject.title}</h2>
                <p className="text-gray-500 font-bold tracking-widest uppercase mb-12">{selectedProject.role}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h4 className="text-2xl font-bold text-black mb-6">Project Overview</h4>
                    <p className="text-gray-600 leading-relaxed font-medium text-lg mb-10 text-justify">{selectedProject.desc}</p>
                    
                    <h4 className="text-2xl font-bold text-black mb-6">Key Features</h4>
                    <ul className="space-y-3">
                      {selectedProject.features.map((f, i) => (
                        <li key={i} className="flex gap-4 text-gray-600 font-medium text-lg">
                          <span className="text-[#FF3366] font-black">▪</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-black mb-6">My Contribution</h4>
                    <ul className="space-y-4">
                      {selectedProject.contributions.map((c, i) => (
                        <li key={i} className="flex gap-4 text-gray-600 font-medium text-lg bg-[#f4f4f5] p-4 rounded-2xl border border-gray-100">
                          <span className="text-[#FF3366] font-black">✓</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#111] p-10 rounded-[2rem] shadow-xl mb-16">
                  <h4 className="text-2xl font-bold text-white mb-4">What I Learned</h4>
                  <p className="text-gray-300 leading-relaxed font-medium text-lg italic text-justify">&ldquo;{selectedProject.learnings}&rdquo;</p>
                </div>

                <h4 className="text-2xl font-bold text-black mb-8">Project Screenshots</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedProject.images.map((img, i) => (
                    <img key={i} src={img} alt="screenshot" className="w-full rounded-3xl border border-gray-200 shadow-lg" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}