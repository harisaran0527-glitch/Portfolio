import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/skills';
import { Code, Terminal, Database, Cpu, Layers } from 'lucide-react';

const CATEGORY_ICONS = [Code, Layers, Database, Cpu, Terminal];

// All tech for the marquee strip
const ALL_TECH = [
  'Python', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'Prisma', 'Unity', 'C#', 'Socket.IO',
  'Machine Learning', 'Data Visualization', 'Vite', 'Tailwind CSS',
  'REST APIs', 'Git', 'HTML5', 'CSS3', 'SQLite', 'Java', 'C'
];

export const Stack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="py-24 border-t border-white/10 overflow-hidden"
      aria-label="Technical Skills"
    >
      {/* ── Scrolling Marquee Strip ─────────── */}
      <div
        aria-hidden="true"
        className="flex whitespace-nowrap overflow-hidden mb-20 border-y border-white/8 py-3.5"
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center gap-10 animate-none shrink-0"
            style={{
              animation: 'scrollMarquee 30s linear infinite',
              paddingRight: '2.5rem',
            }}
          >
            {ALL_TECH.map((t) => (
              <span key={t} className="text-xs font-mono text-slate-600 uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ── Section Header ─────────────────── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-4">
              04 // TECH STACK
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Tools I Build With.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-sm max-w-sm font-mono"
          >
            Languages, frameworks, databases, AI libraries, and game tools across the full product stack.
          </motion.p>
        </div>

        {/* ── Skill Category Cards ────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const IconComp = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-blue-500/30 transition-all duration-350 glass-panel-hover flex flex-col gap-6 hover:shadow-lg hover:shadow-blue-500/5"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 pb-5 border-b border-white/8">
                  <div className="p-2.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/40">
                    <IconComp aria-hidden="true" className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all duration-200 hover:shadow-sm hover:shadow-cyan-500/10 active:scale-95 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-slate-700 flex justify-between">
                  <span>VERIFIED TOOLSET</span>
                  <span className="text-blue-600">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Marquee keyframe style */}
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
