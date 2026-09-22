import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import saranProfileImg from '../assets/saran-profile.jpeg';
import { useMagnetic } from '../hooks/useMagnetic';

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }
});

export const Hero: React.FC = () => {
  const ctaWorkRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3, radius: 110 });
  const ctaConnectRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3, radius: 110 });

  const profileCardRef = useRef<HTMLDivElement>(null);
  const [profileTilt, setProfileTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!profileCardRef.current) return;
    const rect = profileCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setProfileTilt({ rotateX, rotateY });
  };

  const handleProfileMouseLeave = () => {
    setProfileTilt({ rotateX: 0, rotateY: 0 });
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle radial glow behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
      >
        <div className="w-[700px] h-[500px] bg-gradient-radial from-blue-600/15 via-violet-600/8 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Background grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-background-pattern opacity-40 z-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* ── Left Content Column ──────────────────── */}
        <div className="lg:col-span-7">
          {/* Status Badge */}
          <motion.div {...fadeUp(0.05)} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 select-none shadow-sm hover:border-emerald-500/40 transition-colors duration-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" aria-hidden="true" />
              Available for intelligent product building &amp; engineering
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.12)}
            className="text-[clamp(3.5rem,10vw,8.5rem)] font-extrabold tracking-tighter text-white leading-[0.9] mb-7 select-none"
          >
            SARAN<span className="text-blue-500 hover:text-cyan-400 transition-colors duration-300 inline-block">.</span>
          </motion.h1>

          {/* Main Headline */}
          <motion.h2
            {...fadeUp(0.20)}
            className="text-[clamp(1.4rem,3vw,2.8rem)] font-bold tracking-tight leading-tight gradient-text-blue mb-5 max-w-2xl"
          >
            I build intelligent products with code, data and AI.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.28)}
            className="text-base md:text-lg font-mono text-indigo-300 font-medium mb-5 tracking-wide"
          >
            AI &amp; Data Science Student&nbsp;·&nbsp;Full-Stack Developer&nbsp;·&nbsp;AI Builder
          </motion.p>

          {/* Description */}
          <motion.p
            {...fadeUp(0.36)}
            className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            I turn ideas into practical digital products by combining artificial intelligence,
            software development, data, and interactive experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.44)}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a
              ref={ctaWorkRef}
              id="hero-cta-work"
              href="#work"
              onClick={scrollToSection('#work')}
              className="group btn-magnetic btn-shine px-8 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg shadow-black/20 flex items-center gap-2 active:scale-95"
            >
              <span>Explore My Work</span>
              <ArrowDown
                aria-hidden="true"
                className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300"
              />
            </a>

            <a
              ref={ctaConnectRef}
              id="hero-cta-connect"
              href="#contact"
              onClick={scrollToSection('#contact')}
              className="group btn-magnetic px-8 py-4 rounded-xl bg-white/5 text-white font-semibold text-sm border border-white/10 hover:border-indigo-500/60 hover:bg-indigo-950/40 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span>Let's Connect</span>
              <Sparkles aria-hidden="true" className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Domain Chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-5 pt-6 border-t border-white/10 text-xs font-mono text-slate-400"
          >
            {[
              { icon: Cpu, label: 'AI & Data Science', color: 'text-blue-400' },
              { icon: Code2, label: 'Full-Stack Development', color: 'text-indigo-400' },
              { icon: Terminal, label: 'Product Building', color: 'text-cyan-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/5 hover:border-white/15 transition-all duration-300">
                <Icon aria-hidden="true" className={`w-3.5 h-3.5 ${color}`} />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Profile Image Column ────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5 flex justify-center lg:justify-end z-20 relative perspective-1000"
        >
          <motion.div
            ref={profileCardRef}
            onMouseMove={handleProfileMouseMove}
            onMouseLeave={handleProfileMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${profileTilt.rotateX}deg) rotateY(${profileTilt.rotateY}deg)`,
              transition: profileTilt.rotateX === 0 ? 'transform 0.6s ease-out' : 'transform 0.1s ease-out',
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative group max-w-[450px] w-full"
          >
            {/* Atmospheric Cinematic Backdrop Aura Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-blue-600/40 via-indigo-500/30 to-purple-600/40 blur-3xl opacity-85 group-hover:opacity-100 transition duration-700 pointer-events-none"
            />

            {/* Premium Studio Frame Container */}
            <div className="relative p-3.5 sm:p-4 rounded-[2.5rem] bg-[#070914]/95 border border-white/20 ring-1 ring-blue-500/40 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden glass-panel-hover">
              {/* Subtle top rim light accent line */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none"
              />

              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10">
                <img
                  src={saranProfileImg || '/images/saran-image.jpeg'}
                  alt="SARAN - AI & Data Science Student and Full-Stack Developer"
                  className="w-full h-[450px] sm:h-[500px] lg:h-[530px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                />
                
                {/* Soft gradient bottom vignette to blend naturally */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070914] via-[#070914]/60 to-transparent pointer-events-none"
                />

                {/* Bottom Card Glass Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#06070c]/90 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-2xl transition-all duration-300 group-hover:border-cyan-500/40">
                  <div>
                    <span className="text-xs font-mono font-bold text-white tracking-wider block">SARAN</span>
                    <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">AI &amp; DS Student · Full-Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AVAILABLE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ─────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500 text-[10px] font-mono tracking-widest uppercase select-none z-10"
      >
        <span>Scroll</span>
        <div className="w-5 h-8 rounded-full border border-slate-700 p-1 flex justify-center">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_#00f0ff]" />
        </div>
      </motion.div>
    </section>
  );
};

