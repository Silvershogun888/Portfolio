import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const navLinks = ['Home', 'Projects', 'Tech Stack', 'Testimonials', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActive(id);
    const element = document.getElementById(id.toLowerCase().replace(' ', '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/70 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tighter text-zinc-100 cursor-pointer" onClick={() => scrollToSection('Home')}>
          LWEENDO<span className="text-cyan-400">.</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="relative px-2 py-1 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link}
              {active === link && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
