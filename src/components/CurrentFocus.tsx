import React from 'react';
import { Sparkles, Cpu, Layers, Gamepad2, GraduationCap } from 'lucide-react';

export const CurrentFocus: React.FC = () => {
  const buildCategories = [
    {
      title: 'INTELLIGENT SYSTEMS',
      description: 'AI-powered applications and data-driven experiences.',
      icon: Cpu,
      color: 'text-blue-400',
      border: 'border-blue-500/20'
    },
    {
      title: 'WEB PRODUCTS',
      description: 'Modern frontend, backend, APIs, databases, authentication and deployment.',
      icon: Layers,
      color: 'text-indigo-400',
      border: 'border-indigo-500/20'
    },
    {
      title: 'EDUCATION TECHNOLOGY',
      description: 'Student-centric systems for academic, attendance, skills and recognition workflows.',
      icon: GraduationCap,
      color: 'text-cyan-400',
      border: 'border-cyan-500/20'
    },
    {
      title: 'INTERACTIVE EXPERIENCES',
      description: 'Unity, 3D environments, movement, camera and gameplay systems.',
      icon: Gamepad2,
      color: 'text-amber-400',
      border: 'border-amber-500/20'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-24">
      
      {/* CURRENTLY EXPLORING Banner */}
      <div className="relative p-10 md:p-16 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#0d0d12] to-black border border-indigo-500/30 overflow-hidden text-center glow-subtle-violet">
        <div className="absolute inset-0 grid-background-pattern opacity-30" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-xs font-mono text-indigo-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>07 // CURRENTLY EXPLORING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white">
            AI × FULL STACK × PRODUCT DEVELOPMENT
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Exploring how AI capabilities can be combined with modern software products to create experiences that are useful, practical, and scalable.
          </p>
        </div>
      </div>

      {/* WHAT I BUILD Section */}
      <div>
        <div className="mb-12">
          <span className="text-xs font-mono text-slate-500 tracking-widest uppercase block mb-3">SYSTEM TAXONOMY</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            WHAT I BUILD
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildCategories.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#0d0d12] border ${item.border} hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between glass-panel-hover group`}
              >
                <div>
                  <div className="p-3 rounded-xl bg-white/5 w-fit mb-6 text-slate-200 group-hover:scale-110 transition-transform">
                    <IconComp className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wider font-mono mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 text-[10px] font-mono text-slate-600">
                  // CORE DOMAIN
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
