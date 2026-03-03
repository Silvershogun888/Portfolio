import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Aura Vert",
    url: "https://aura-vert-seven.vercel.app/",
    image: "https://image.thum.io/get/width/1024/crop/768/https://aura-vert-seven.vercel.app/",
    tech: ["React", "Tailwind", "Framer Motion"]
  },
  {
    title: "Verdant Rho",
    url: "https://verdant-rho.vercel.app/",
    image: "https://image.thum.io/get/width/1024/crop/768/https://verdant-rho.vercel.app/",
    tech: ["Next.js", "TypeScript", "CSS Modules"]
  },
  {
    title: "Prime Stitch",
    url: "https://prime-stitch.vercel.app/",
    image: "https://image.thum.io/get/width/1024/crop/768/https://prime-stitch.vercel.app/",
    tech: ["Vue", "Tailwind", "Vite"]
  },
  {
    title: "Hanuman Earthmovers",
    url: "https://hanumanearthmovers.vercel.app/#/",
    image: "https://image.thum.io/get/width/1024/crop/768/https://hanumanearthmovers.vercel.app/",
    tech: ["React", "Styled Components"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Selected Works</h2>
        <div className="h-[1px] w-24 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="group block relative rounded-2xl overflow-hidden glass-panel glass-shine border border-white/5 hover:border-cyan-400/50 transition-colors duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <span className="px-6 py-3 bg-zinc-950/80 backdrop-blur-md text-cyan-400 rounded-full font-medium flex items-center gap-2 border border-cyan-400/30">
                  View Live <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="p-8 relative z-20 bg-zinc-950/50 backdrop-blur-sm transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
              <h3 className="text-2xl font-semibold text-zinc-100 mb-3">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs font-mono text-zinc-400 px-2 py-1 rounded bg-white/5 border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Neon Frame effect */}
            <div className="absolute inset-0 border border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(34,211,238,0.2)]" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
