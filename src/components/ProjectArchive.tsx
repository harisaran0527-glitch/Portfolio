import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { type Project } from '../data/projects';
import { ProjectVisualCanvas } from './ProjectVisualCanvas';
import { ArrowUpRight, Filter } from 'lucide-react';

interface ProjectArchiveProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

type FilterType =
  | 'ALL'
  | 'AI / DATA'
  | 'FULL STACK'
  | 'EDUCATION TECH'
  | 'HACKATHON'
  | 'UNITY / 3D'
  | 'EXPERIMENTAL';

const CATEGORIES: FilterType[] = [
  'ALL',
  'AI / DATA',
  'FULL STACK',
  'EDUCATION TECH',
  'HACKATHON',
  'UNITY / 3D',
  'EXPERIMENTAL',
];

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: '-60px' });

  const filtered =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.filterCategory === activeFilter);

  return (
    <section
      id="archive"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      {/* ── Header ─────────────────────────── */}
      <div
        ref={headingRef}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase block mb-4">
            03 // ARCHIVE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            EVERYTHING I'VE BUILT
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-sm max-w-sm font-mono leading-relaxed"
        >
          The complete archive of production apps, academic platforms, game mechanics, and hackathon concepts.
        </motion.p>
      </div>

      {/* ── Filter Bar ─────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-5 border-b border-white/10">
        <div className="flex items-center gap-1.5 mr-1 text-xs font-mono text-slate-600">
          <Filter aria-hidden="true" className="w-3.5 h-3.5" />
          <span>FILTER</span>
        </div>
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          const count = cat === 'ALL' ? projects.length : projects.filter(p => p.filterCategory === cat).length;
          return (
            <button
              key={cat}
              id={`archive-filter-${cat.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase()}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={isActive}
              className={`text-[11px] font-mono px-3.5 py-1.5 rounded-lg transition-all duration-250 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold border border-blue-500 shadow-md shadow-blue-600/20'
                  : 'bg-white/5 text-slate-500 hover:text-slate-200 hover:bg-white/8 border border-white/5'
              }`}
            >
              <span>{cat}</span>
              <span className={`${isActive ? 'text-blue-200' : 'text-slate-600'}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* ── Grid ───────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-xl bg-[#0d0d12] border border-white/10 overflow-hidden hover:border-indigo-500/40 transition-all duration-350 flex flex-col cursor-pointer"
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`Open case study: ${project.title}`}
              onKeyDown={(e) => e.key === 'Enter' && onSelectProject(project)}
            >
              {/* Visual */}
              <div className="w-full h-44 relative overflow-hidden border-b border-white/8 flex-shrink-0">
                <div className="absolute inset-0 group-hover:scale-[1.04] transition-transform duration-500">
                  <ProjectVisualCanvas type={project.visualType} title={project.title} />
                </div>
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300" />
                {/* Category badge overlay */}
                <span className="absolute top-3 left-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-slate-300 uppercase tracking-wider">
                  {project.filterCategory}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 mb-2.5">
                    <span>PROJECT {project.number}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-2.5 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-500"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-600">+{project.techStack.length - 3}</span>
                    )}
                  </div>

                  <div
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full flex-shrink-0 bg-white/5 group-hover:bg-blue-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center text-slate-600 font-mono text-sm">
          No projects in this category yet.
        </div>
      )}
    </section>
  );
};
