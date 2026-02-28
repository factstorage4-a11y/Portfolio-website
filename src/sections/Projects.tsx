import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Student Result',
    subtitle: 'Management System',
    description: 'A comprehensive CLI-based system using file handling for storing and retrieving student result records. Built with C++ featuring secure data storage and efficient retrieval mechanisms.',
    techStack: ['C++', 'File Handling', 'Data Structures'],
    github: 'https://github.com/vedprakasharya',
    live: '',
    specs: [
      { label: 'Language', value: 'C++' },
      { label: 'Type', value: 'CLI' },
      { label: 'Storage', value: 'File' },
      { label: 'Records', value: '1000+' },
    ],
  },
  {
    id: 2,
    name: 'Network',
    subtitle: 'Implementation',
    description: 'Designed and implemented a complete small office network using Cisco Packet Tracer. Created separate VLANs for different departments with proper security configurations.',
    techStack: ['Cisco Packet Tracer', 'VLAN', 'Networking', 'Security'],
    github: 'https://github.com/vedprakasharya',
    live: '',
    specs: [
      { label: 'Tool', value: 'Packet Tracer' },
      { label: 'VLANs', value: '2+' },
      { label: 'Security', value: 'VPN' },
      { label: 'Devices', value: '10+' },
    ],
  },
  {
    id: 3,
    name: 'Portfolio',
    subtitle: 'Website',
    description: 'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, and dynamic content management.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/vedprakasharya',
    live: 'https://vedarya.dev',
    specs: [
      { label: 'Framework', value: 'React' },
      { label: 'Styling', value: 'Tailwind' },
      { label: 'Animation', value: 'GSAP' },
      { label: 'Responsive', value: '100%' },
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section relative min-h-screen py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              Featured Work
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light"
          >
            <span className="block">Code in</span>
            <span className="block text-white/60">Motion</span>
          </motion.h2>
        </div>

        {/* Projects List */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-24"
            >
              {/* Left - Project Info */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-8">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-2">
                    {project.name}
                  </h3>
                  <p className="text-2xl sm:text-3xl text-white/50 font-light">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-white/60 leading-relaxed mb-8 max-w-lg">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-xs uppercase tracking-wider border border-white/10 text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right - Specs Grid */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="border border-white/10">
                  <div className="p-6 border-b border-white/10">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Project Specifications
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-white/10">
                    {project.specs.map((spec, specIndex) => (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + specIndex * 0.1 }}
                        className="bg-[#0d0d0d] p-6"
                      >
                        <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">
                          {spec.label}
                        </div>
                        <div className="text-2xl font-light text-white">
                          {spec.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full mt-4 py-4 border border-white/10 text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-2xl w-full bg-[#141414] border border-white/10 p-8 lg:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-light mb-2">{selectedProject.name}</h3>
                  <p className="text-xl text-white/50">{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-white/5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-white/60 leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {selectedProject.specs.map((spec) => (
                  <div key={spec.label} className="border border-white/10 p-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">
                      {spec.label}
                    </div>
                    <div className="text-lg font-light">{spec.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 justify-center"
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </a>
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
