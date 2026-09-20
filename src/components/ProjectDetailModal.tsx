import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '../data/projects';
import { ProjectVisualCanvas } from './ProjectVisualCanvas';
import { X, CheckCircle2, Cpu, Wrench, Layers, Workflow } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const closeBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.3 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-[#0d0d12] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#0d0d12]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950/80 text-blue-400 border border-blue-800/40 shadow-sm">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">{project.category}</span>
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="btn-magnetic p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-all duration-200 border border-white/10 hover:border-cyan-500/40 active:scale-95"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 md:p-10 overflow-y-auto space-y-10">

              {/* Hero Visual Canvas */}
              <div className="w-full h-72 md:h-80 rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <ProjectVisualCanvas type={project.visualType} title={project.title} />
              </div>

              {/* Title & Metadata */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="text-base md:text-lg font-mono text-indigo-400 font-medium mb-4">
                    {project.subtitle}
                  </p>
                )}
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:text-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workflow Concept Banner (if applicable) */}
              {project.caseStudy.workflow && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-black border border-red-500/30 shadow-lg shadow-red-500/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
                    <Workflow className="w-4 h-4" />
                    <span>Architecture Workflow Pipeline</span>
                  </div>
                  <p className="text-sm font-mono text-slate-200 font-medium">
                    {project.caseStudy.workflow}
                  </p>
                </div>
              )}

              {/* Overview & Problem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
                <div className="space-y-3">
                  <h3 className="text-sm font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Overview</span>
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.caseStudy.overview}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    <span>Problem Statement</span>
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>
              </div>

              {/* Approach & Features */}
              <div className="space-y-6 pt-4 border-t border-white/10">
                <div>
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3">Technical Approach</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.caseStudy.approach}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.caseStudy.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-2.5 hover:border-white/15 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contribution */}
              <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-2 shadow-lg shadow-blue-500/5">
                <h3 className="text-xs font-mono text-blue-300 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Saran's Technical Contribution</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.caseStudy.contribution}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#0d0d12] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">Year: {project.year}</span>
              <button
                onClick={onClose}
                className="btn-magnetic px-6 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all duration-200"
              >
                Close Case Study
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

