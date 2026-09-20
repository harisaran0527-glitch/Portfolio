import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Layers, BarChart, Rocket, Gamepad2, GraduationCap, Building2 } from 'lucide-react';

const focusAreas = [
  { label: 'AI & Machine Learning', icon: Cpu, accent: 'text-blue-400 border-blue-500/25 bg-blue-500/8' },
  { label: 'Full-Stack Development', icon: Layers, accent: 'text-indigo-400 border-indigo-500/25 bg-indigo-500/8' },
  { label: 'Data & Analytics', icon: BarChart, accent: 'text-cyan-400 border-cyan-500/25 bg-cyan-500/8' },
  { label: 'Product Development', icon: Rocket, accent: 'text-purple-400 border-purple-500/25 bg-purple-500/8' },
  { label: 'Interactive / Game Development', icon: Gamepad2, accent: 'text-amber-400 border-amber-500/25 bg-amber-500/8' },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
      aria-label="About Saran"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

        {/* ── Left Column ──────────────────── */}
        <div className="lg:col-span-5 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-4">
              01 // ABOUT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Building ideas into real products.
            </h2>
          </motion.div>

          {/* Focus tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2.5"
          >
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block">
              Core Disciplines
            </span>
            <div className="flex flex-wrap gap-2.5">
              {focusAreas.map(({ label, icon: Icon, accent }) => (
                <div
                  key={label}
                  className={`px-3.5 py-2 rounded-lg border flex items-center gap-2 text-xs font-mono text-slate-200 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-default ${accent}`}
                >
                  <Icon aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right Column ─────────────────── */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="text-white font-semibold text-xl leading-relaxed">
              I'm Saran, an AI &amp; Data Science student focused on turning ideas into functional, scalable, and user-friendly digital experiences.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              My work spans AI applications, full-stack web development, student management systems, productivity platforms, hackathon solutions, and interactive 3D experiences.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              I enjoy working across the complete product journey — from idea and interface design to development, database integration, testing, and deployment.
            </p>
          </motion.div>

          {/* Education supporting details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/8"
          >
            <div className="p-5 rounded-xl bg-white/4 border border-white/8 hover:border-blue-500/25 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex items-start gap-4 group/card">
              <div className="p-2.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/50 flex-shrink-0">
                <GraduationCap aria-hidden="true" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block mb-1.5">Education</span>
                <span className="text-sm font-semibold text-white leading-snug block">
                  B.Tech Artificial Intelligence &amp; Data Science
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/4 border border-white/8 hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex items-start gap-4 group/card">
              <div className="p-2.5 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-900/50 flex-shrink-0">
                <Building2 aria-hidden="true" className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block mb-1.5">Institution</span>
                <span className="text-sm font-semibold text-white leading-snug block">
                  AVS Engineering College (Autonomous), Salem
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
