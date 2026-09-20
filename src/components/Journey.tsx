import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { JOURNEY_MILESTONES } from '../data/journey';
import { CheckCircle2 } from 'lucide-react';

export const Journey: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block mb-3">
            06 // EVOLUTION
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            MY JOURNEY
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md font-mono leading-relaxed">
          The continuous evolution of technical skills, project milestones, hackathon builds, and interactive experiences.
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
        {JOURNEY_MILESTONES.map((milestone, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full bg-[#070709] border-2 border-purple-500 group-hover:scale-125 group-hover:bg-purple-500 transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Card Content */}
            <div className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 glass-panel-hover">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40">
                  {milestone.category}
                </span>
                <span className="text-xs font-mono text-slate-500">MILESTONE 0{idx + 1}</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3 group-hover:text-purple-300 transition-colors">
                {milestone.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {milestone.description}
              </p>

              {/* Highlights List */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {milestone.highlights.map((hl, hIdx) => (
                  <span
                    key={hIdx}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/5 flex items-center gap-1.5 hover:border-purple-400/40 transition-colors duration-200"
                  >
                    <CheckCircle2 aria-hidden="true" className="w-3 h-3 text-purple-400" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
