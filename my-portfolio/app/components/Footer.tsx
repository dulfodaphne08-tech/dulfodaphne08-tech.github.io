export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-white py-16 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Anton, sans-serif' }}>DAPHNE.</h2>
          <p className="text-gray-400 max-w-sm mb-6 font-medium">3rd Year BSIT Student at Eastern Samar State University. Aspiring IT Professional.</p>
          <p className="text-sm text-gray-500 font-bold">© 2026 Daphne Dulfo. All rights reserved.</p>
        </div>
        <div>
          <h4 className="font-black mb-6 text-white uppercase tracking-widest text-sm">Quick Links</h4>
          <div className="flex flex-col gap-3">
            <a href="#about" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">About</a>
            <a href="#journey" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">Journey</a>
            <a href="#skills" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">Skills</a>
            <a href="#work" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">Work</a>
          </div>
        </div>
        <div>
          <h4 className="font-black mb-6 text-white uppercase tracking-widest text-sm">Socials</h4>
          <div className="flex flex-col gap-3">
            <a href="https://github.com/dulfodaphne08-tech" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">GitHub</a>
            <a href="https://www.facebook.com/share/19c8UTaNGX/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">Facebook</a>
            <a href="https://www.instagram.com/dulfodaphnee" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">Instagram</a>
            <a href="mailto:dulfodaphne08@gmail.com" className="text-gray-400 hover:text-[#FF3366] font-medium transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}