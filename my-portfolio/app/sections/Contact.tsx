"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);
    // Your actual Web3Forms Access Key
    formData.append("access_key", "76396678-9af5-4555-8b03-0c71454277e0");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully! I will get back to you soon.");
      (event.target as HTMLFormElement).reset();
    } else {
      setResult("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#111111] text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-[clamp(2.5rem,9vw,4.5rem)] font-extrabold mb-6 tracking-tighter text-white">Let's Connect.</h2>
          <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto text-center">
            I'm currently looking for OJT and part-time opportunities where I can gain practical experience.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.2 }} 
          className="bg-[#1a1a1a] p-5 sm:p-8 md:p-14 rounded-[2rem] md:rounded-[2.5rem] border border-gray-800 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Your Name</label>
              <input 
                type="text" 
                name="name" 
                required
                className="w-full bg-[#222] border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FF3366] transition-colors font-medium" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Your Email</label>
              <input 
                type="email" 
                name="email" 
                required
                className="w-full bg-[#222] border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FF3366] transition-colors font-medium" 
                placeholder="john@example.com" 
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">Message</label>
            <textarea 
              name="message" 
              required
              rows={5} 
              className="w-full bg-[#222] border border-gray-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FF3366] transition-colors font-medium" 
              placeholder="What would you like to say?"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-[#FF3366] text-white font-black text-lg rounded-2xl hover:bg-white hover:text-[#111] transition-all shadow-xl shadow-pink-500/20 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message →"}
          </button>

          {/* Success/Error Message */}
          {result && (
            <p className={`text-center mt-6 font-bold ${result.includes("success") ? "text-green-400" : "text-[#FF3366]"}`}>
              {result}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}