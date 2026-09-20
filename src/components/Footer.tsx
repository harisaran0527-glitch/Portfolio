import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 text-slate-400">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Subtitle */}
        <div>
          <a
            href="#hero"
            onClick={scrollToTop}
            className="text-2xl font-bold tracking-tighter text-white hover:text-blue-400 transition-colors inline-block mb-1"
          >
            SARAN<span className="text-blue-500">.</span>
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
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-blue-500 text-slate-300 hover:text-white border border-white/10 transition-all duration-300"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
