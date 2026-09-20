import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type Project } from '../data/projects';
import { ProjectVisualCanvas } from './ProjectVisualCanvas';
import { ArrowUpRight } from 'lucide-react';

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

// ── Single featured project row ──────────────────────────────────────────────

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
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
      className="group relative rounded-2xl bg-[#0d0d12] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 min-h-[420px] ${isEven ? '' : 'lg:[direction:rtl]'}`}>

        {/* ── Visual Panel ─── */}
        <div className={`lg:col-span-7 relative overflow-hidden ${isEven ? '' : 'lg:[direction:ltr]'}`}>
          <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-700 ease-out">
            <ProjectVisualCanvas type={project.visualType} title={project.title} />
          </div>
          {/* Inner gradient fade */}
          <div className={`absolute inset-0 pointer-events-none ${
            isEven
              ? 'bg-gradient-to-r from-transparent via-transparent to-[#0d0d12]'
              : 'bg-gradient-to-l from-transparent via-transparent to-[#0d0d12]'
          } opacity-60`} />
        </div>

        {/* ── Content Panel ─── */}
        <div className={`lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between ${isEven ? '' : 'lg:[direction:ltr]'}`}>
          <div>
            {/* Metadata row */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-mono font-bold text-blue-400 tracking-wider">
                PROJECT {project.number}
              </span>
              <span className="text-xs font-mono text-slate-600 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                {project.year}
              </span>
            </div>

            {/* Category */}
            <p className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-3">
              {project.category}
            </p>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-tight group-hover:text-blue-200 transition-colors duration-300">
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
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <button
              id={`project-detail-${project.id}`}
              onClick={onSelect}
              className="group/btn w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/12 bg-white/5 hover:bg-white hover:text-black text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight
                aria-hidden="true"
                className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

      </div>

      {/* Hover border glow line on left */}
      <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  );
};
