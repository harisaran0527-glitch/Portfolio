import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Compass, Code2, ShieldCheck, RefreshCw } from 'lucide-react';

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      description: 'Understand the problem and define the actual user need.',
      icon: Search,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10'
    },
    {
      number: '02',
      title: 'DESIGN',
      description: 'Create a clean and practical experience around the problem.',
      icon: Compass,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10'
    },
    {
      number: '03',
      title: 'BUILD',
      description: 'Develop the frontend, backend, database, and core functionality.',
      icon: Code2,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10'
    },
    {
      number: '04',
      title: 'TEST',
      description: 'Validate workflows, usability, performance, and reliability.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10'
    },
    {
      number: '05',
      title: 'IMPROVE',
      description: 'Iterate based on feedback and real-world usage.',
      icon: RefreshCw,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10'
    }
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-16"
      >
        <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-3">
          05 // WORKFLOW
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          FROM IDEA → INTERFACE → PRODUCT
        </h2>
      </motion.div>

      {/* 5-Step Process Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative p-6 rounded-xl bg-[#0d0d12] border border-white/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group glass-panel-hover"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-extrabold text-white">
                    {step.number}
                  </span>
                  <div className={`p-2 rounded-lg ${step.bg} ${step.color} border ${step.border} group-hover:scale-110 transition-transform duration-300`}>
                    <StepIcon aria-hidden="true" className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white tracking-wider mb-2 font-mono group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Connecting indicator line for desktop */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-px bg-white/20 group-hover:bg-blue-400/50 transition-colors duration-300"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
