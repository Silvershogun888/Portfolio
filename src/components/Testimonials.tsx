import { motion } from 'motion/react';

const testimonials = [
  {
    name: "Mr. Nyambe Harrison Kanchaya",
    role: "Administrative Role, Infratel",
    text: "Lweendo is a highly motivated and dedicated individual. His problem-solving skills and ability to learn quickly make him an asset to any technical team. He communicates complex ideas clearly and always maintains a professional demeanor."
  },
  {
    name: "Programming Student",
    role: "Mentee",
    text: "As a tutor, Lweendo has an incredible amount of patience. He breaks down complex Java and Python concepts into easily digestible lessons. My understanding of data structures improved significantly under his guidance."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">References & Feedback</h2>
        <div className="h-[1px] w-24 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="glass-panel p-8 rounded-2xl group hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-500"
          >
            <p className="text-zinc-400 leading-relaxed mb-8 text-lg italic">"{t.text}"</p>
            <div>
              <h4 className="text-zinc-100 font-medium">{t.name}</h4>
              <p className="text-zinc-500 text-sm">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
