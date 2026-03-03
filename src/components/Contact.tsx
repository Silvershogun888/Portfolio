import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Get In Touch</h2>
        <div className="h-[1px] w-24 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold text-zinc-100 mb-6">Let's build something together.</h3>
          <p className="text-zinc-400 mb-12 max-w-md">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="font-medium">lweendomarco@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyan-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Phone</p>
                <p className="font-medium">0770263178 / 0967387552</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Location</p>
                <p className="font-medium">Lusaka, Zambia</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel p-8 md:p-10 rounded-3xl"
        >
          <div className="space-y-8">
            <div className="relative">
              <input 
                type="text" 
                id="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={(e) => !e.target.value && setFocused(null)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-zinc-100 focus:outline-none transition-colors peer"
              />
              <label 
                htmlFor="name" 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'name' ? '-top-5 text-xs text-cyan-400' : 'top-3 text-zinc-500'
                }`}
              >
                Name
              </label>
              <div className={`absolute bottom-0 left-0 h-[1px] bg-cyan-400 transition-all duration-500 ease-out ${
                focused === 'name' ? 'w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'w-0'
              }`} />
            </div>

            <div className="relative">
              <input 
                type="email" 
                id="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={(e) => !e.target.value && setFocused(null)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-zinc-100 focus:outline-none transition-colors peer"
              />
              <label 
                htmlFor="email" 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'email' ? '-top-5 text-xs text-cyan-400' : 'top-3 text-zinc-500'
                }`}
              >
                Email
              </label>
              <div className={`absolute bottom-0 left-0 h-[1px] bg-cyan-400 transition-all duration-500 ease-out ${
                focused === 'email' ? 'w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'w-0'
              }`} />
            </div>

            <div className="relative">
              <textarea 
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={(e) => !e.target.value && setFocused(null)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-zinc-100 focus:outline-none transition-colors peer resize-none"
              />
              <label 
                htmlFor="message" 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focused === 'message' ? '-top-5 text-xs text-cyan-400' : 'top-3 text-zinc-500'
                }`}
              >
                Message
              </label>
              <div className={`absolute bottom-0 left-0 h-[1px] bg-cyan-400 transition-all duration-500 ease-out ${
                focused === 'message' ? 'w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'w-0'
              }`} />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${
                submitted ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-zinc-100 text-zinc-950 disabled:opacity-70'
              }`}
            >
              {!submitted && !isSubmitting && <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />}
              <span className="relative z-10 group-hover:text-zinc-950">
                {isSubmitting ? 'Sending...' : submitted ? 'Message Sent' : 'Send Message'}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
