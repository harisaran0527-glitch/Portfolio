import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectArchive } from './components/ProjectArchive';
import { Stack } from './components/Stack';
import { Process } from './components/Process';
import { Journey } from './components/Journey';
import { CurrentFocus } from './components/CurrentFocus';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PROJECTS, type Project } from './data/projects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'work', 'about', 'stack', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-slate-100 selection:bg-purple-500/30 selection:text-white bg-noise">
      {/* Background Interactive Particle Canvas */}
      <BackgroundCanvas />

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <About />
        <FeaturedProjects
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <ProjectArchive
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <Stack />
        <Process />
        <Journey />
        <CurrentFocus />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Case Study Drawer/Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default App;
