import { useState } from 'react';
import { motion } from 'motion/react';

const skills = [
  "Java", "Python", "HTML", "CSS", "JavaScript", 
  "MySQL", "React", "Tailwind CSS", "Networking", 
  "Data Structures", "Algorithms"
];

export default function TechStack() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="tech-stack" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Technical Arsenal</h2>
        <div className="h-[1px] w-24 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
      </motion.div>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, i) => (
          <motion.button
            key={skill}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
            onClick={() => setActiveSkill(skill === activeSkill ? null : skill)}
            className={`relative overflow-hidden px-6 py-3 rounded-full border transition-all duration-300 ${
              activeSkill === skill 
                ? 'border-cyan-400 text-zinc-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                : 'border-white/10 text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:-translate-y-1 glass-panel'
            }`}
          >
            <div 
              className={`absolute inset-0 bg-cyan-400 transition-transform duration-300 ease-out ${
                activeSkill === skill ? 'translate-y-0' : 'translate-y-full'
              }`} 
            />
            <span className="relative z-10 font-mono text-sm">{skill}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
