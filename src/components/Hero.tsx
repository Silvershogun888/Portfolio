import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full glass-panel rounded-3xl p-12 md:p-20 relative z-10"
      >
        <motion.div variants={item} className="mb-6 inline-block">
          <span className="px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-400/30 rounded-full bg-cyan-400/5">
            Available for work
          </span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100 mb-6 leading-tight">
          Crafting digital <br className="hidden md:block" />
          experiences with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">precision.</span>
        </motion.h1>

        <motion.div variants={item} className="mb-10">
          <h2 className="text-xl md:text-2xl text-zinc-400 font-light inline-block relative neon-trace active pb-2">
            Lweendo Caleb Kazoka — Web Developer & IT Specialist
          </h2>
        </motion.div>

        <motion.p variants={item} className="text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          Information Systems and Technology student at the University of Lusaka. 
          Specializing in Java, Python, and modern web technologies. Passionate about 
          building robust, scalable applications and solving complex problems.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-6">
          <motion.button 
            onClick={scrollToProjects}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 bg-zinc-100 text-zinc-950 font-medium rounded-xl overflow-hidden transition-all"
          >
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-zinc-950">
              View Projects <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
          
          <motion.button 
            onClick={scrollToContact}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 glass-panel rounded-xl font-medium text-zinc-100 hover:bg-white/5 transition-colors"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
