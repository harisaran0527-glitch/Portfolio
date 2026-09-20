import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { type Project } from '../data/projects';
import { ProjectVisualCanvas } from './ProjectVisualCanvas';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject,
}) => {
  const featuredList = projects.filter((p) => p.featured);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">

      {/* ── Section Header ─────────────────── */}
      <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-4">
            02 // FEATURED WORK
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
            Selected Products<br />
            <span className="text-slate-500 font-normal text-3xl sm:text-4xl md:text-5xl">&amp; Systems.</span>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-sm max-w-sm font-mono leading-relaxed"
        >
          Full-stack web products, AI analytical platforms, student management systems, and 3D experiences.
        </motion.p>
      </div>

      {/* ── Featured Project Items ──────────── */}
      <div className="space-y-16 lg:space-y-24">
        {featuredList.map((project, idx) => (
          <FeaturedProjectItem
            key={project.id}
            project={project}
            index={idx}
            onSelect={() => onSelectProject(project)}
          />
        ))}
      </div>
    </section>
  );
};

// ── Single featured project row with 3D Card Tilt & Spotlight ──────────────────────────

interface FeaturedProjectItemProps {
  project: Project;
  index: number;
  onSelect: () => void;
}

const FeaturedProjectItem: React.FC<FeaturedProjectItemProps> = ({
  project,
  index,
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLButtonElement>({ strength: 0.3, radius: 100 });

  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ rotateX, rotateY });
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: tilt.rotateX === 0 ? 'transform 0.6s ease-out' : 'transform 0.1s ease-out',
        }}
        className="group relative rounded-2xl bg-[#080a14]/90 border border-white/12 overflow-hidden hover:border-blue-500/50 transition-colors duration-500 shadow-2xl glass-panel-hover"
      >
        {/* Dynamic Cursor Spotlight Beam Sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(59, 130, 246, 0.15), rgba(0, 240, 255, 0.05) 40%, transparent 80%)`,
          }}
        />

        <div className={`grid grid-cols-1 lg:grid-cols-12 min-h-[420px] ${isEven ? '' : 'lg:[direction:rtl]'}`}>

          {/* ── Visual Panel ─── */}
          <div className={`lg:col-span-7 relative overflow-hidden ${isEven ? '' : 'lg:[direction:ltr]'}`}>
            <div className="absolute inset-0 group-hover:scale-[1.035] transition-transform duration-700 ease-out">
              <ProjectVisualCanvas type={project.visualType} title={project.title} />
            </div>
            {/* Inner gradient fade */}
            <div className={`absolute inset-0 pointer-events-none ${
              isEven
                ? 'bg-gradient-to-r from-transparent via-transparent to-[#080a14]'
                : 'bg-gradient-to-l from-transparent via-transparent to-[#080a14]'
            } opacity-60`} />
          </div>

          {/* ── Content Panel ─── */}
          <div className={`lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between ${isEven ? '' : 'lg:[direction:ltr]'}`}>
            <div>
              {/* Metadata row */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono font-bold text-cyan-400 tracking-wider">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  {project.year}
                </span>
              </div>

              {/* Category */}
              <p className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-3 font-semibold">
                {project.category}
              </p>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight group-hover:text-cyan-200 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {project.shortDescription}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 group-hover:border-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <button
                ref={ctaRef}
                id={`project-detail-${project.id}`}
                onClick={onSelect}
                className="group/btn btn-magnetic btn-shine w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white hover:text-black text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-md hover:shadow-cyan-500/20"
              >
                <span>Explore Case Study</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

        </div>

        {/* Hover border glow line on left */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#00f0ff]" />
      </div>
    </motion.article>
  );
};

