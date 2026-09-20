import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'STACK', href: '#stack' },
  { label: 'JOURNEY', href: '#journey' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) setScrollProgress((window.scrollY / docH) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Top Scroll Progress Bar ───────── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Main Header ───────────────────── */}
      <header
        role="banner"
        className={`fixed top-0.5 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#070709]/85 backdrop-blur-lg border-b border-white/8'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => smoothScroll(e, '#hero')}
            id="nav-brand"
            aria-label="SARAN Portfolio — Scroll to top"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src="/assets/logo/saran-symbol.svg"
              alt="SARAN Logo"
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.25)]"
            />
            <span className="text-xl font-black tracking-[0.2em] text-white flex items-baseline group-hover:text-slate-100 transition-colors">
              SARAN<span className="text-[#00F0FF] group-hover:translate-x-0.5 transition-transform inline-block">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={label}
                  id={`nav-${sectionId}`}
                  href={href}
                  onClick={(e) => smoothScroll(e, href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-[11px] font-mono tracking-widest transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-200'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen
              ? <X aria-hidden="true" className="w-5 h-5" />
              : <Menu aria-hidden="true" className="w-5 h-5" />
            }
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ────────────── */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-30 bg-[#070709]/96 backdrop-blur-2xl flex flex-col justify-center px-8"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, href }, idx) => (
              <a
                key={label}
                href={href}
                onClick={(e) => smoothScroll(e, href)}
                className="group flex items-center justify-between py-5 border-b border-white/8 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[11px] font-mono text-blue-500 w-6">0{idx + 1}</span>
                  <span className="text-2xl font-bold tracking-tight">{label}</span>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-5 h-5 text-slate-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            ))}
          </nav>

          <div className="mt-12 pt-8 border-t border-white/8">
            <p className="text-xs font-mono text-slate-700">
              AI & Data Science · Full-Stack Developer · AI Builder
            </p>
          </div>
        </div>
      )}
    </>
  );
};
