import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export const Footer: React.FC = () => {
  const brandRef = useMagnetic<HTMLAnchorElement>({ strength: 0.2 });
  const scrollTopRef = useMagnetic<HTMLButtonElement>({ strength: 0.35 });

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Subtitle */}
        <div>
          <a
            ref={brandRef}
            href="#hero"
            onClick={scrollToTop}
            className="btn-magnetic text-2xl font-bold tracking-tighter text-white hover:text-cyan-400 transition-colors inline-block mb-1 group"
          >
            SARAN<span className="text-cyan-400 group-hover:text-blue-500 transition-colors">.</span>
          </a>
          <p className="text-xs font-mono text-slate-500">
            AI & Data Science Student · Full-Stack Developer · AI Builder
          </p>
        </div>

        {/* Copyright & Scroll Top Button */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-slate-500">
            © {new Date().getFullYear()} SARAN. All rights reserved.
          </span>

          <button
            ref={scrollTopRef}
            onClick={scrollToTop}
            className="btn-magnetic p-3 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 transition-all duration-300 group"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </footer>
  );
};

