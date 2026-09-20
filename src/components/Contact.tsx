import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Link2, ExternalLink, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'harisaran0527@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/sarans-engineer';
  const githubUrl = 'https://github.com/harisaran0527-glitch';

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative p-10 sm:p-14 md:p-20 rounded-3xl bg-[#0d0d12] border border-white/15 overflow-hidden shadow-2xl glass-panel"
      >
        {/* Glow Effects */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-400">
            <MessageSquare aria-hidden="true" className="w-3.5 h-3.5" />
            <span>08 // GET IN TOUCH</span>
          </div>

          <div>
            <span className="text-xl sm:text-2xl font-mono text-slate-400 uppercase tracking-widest block mb-2">
              HAVE AN IDEA?
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              LET'S BUILD SOMETHING MEANINGFUL.
            </h2>
          </div>

          <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
            Whether you have a product concept, full-stack application requirement, AI project, or interactive experience idea — feel free to reach out.
          </p>

          {/* Direct Actions Grid */}
          <div className="pt-6 flex flex-wrap gap-4 items-center">
            {/* Email Action */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10">
              <a
                id="contact-email-btn"
                href={`mailto:${emailAddress}`}
                className="px-5 py-3 rounded-lg bg-white text-black font-semibold text-xs font-mono hover:bg-blue-400 hover:text-white transition-all flex items-center gap-2"
              >
                <Mail aria-hidden="true" className="w-4 h-4" />
                <span>Email Saran ({emailAddress})</span>
              </a>

              <button
                id="contact-copy-email-btn"
                onClick={handleCopyEmail}
                className="p-3 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5"
                title="Copy Email Address"
                aria-label="Copy Email Address"
              >
                {copied ? (
                  <Check aria-hidden="true" className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy aria-hidden="true" className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            {/* LinkedIn Action */}
            <a
              id="contact-linkedin-link"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs font-mono border border-white/10 hover:border-blue-500/50 transition-all flex items-center gap-2"
            >
              <Link2 aria-hidden="true" className="w-4 h-4 text-blue-400" />
              <span>linkedin.com/in/sarans-engineer</span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 text-slate-500" />
            </a>

            {/* GitHub Action */}
            <a
              id="contact-github-link"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs font-mono border border-white/10 hover:border-purple-500/50 transition-all flex items-center gap-2"
            >
              <ExternalLink aria-hidden="true" className="w-4 h-4 text-purple-400" />
              <span>github.com/harisaran0527-glitch</span>
              <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
