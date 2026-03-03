import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Network, Code2, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  className?: string;
}

const Projects = ({ className = '' }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // GitHub banner animation
      gsap.fromTo(
        githubRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: githubRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.3,
          },
        }
      );

      // Projects animation
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.3,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Student Result Management System',
      description: 'Built a CLI-based system using file handling for storing and retrieving student result records.',
      icon: Database,
      tech: ['C', 'File Handling', 'CLI'],
      features: [
        'Add, update, and delete student records',
        'Search and filter results',
        'Persistent data storage',
      ],
      links: {
        demo: '#',
        github: 'https://github.com/vedprakas3',
      },
    },
    {
      title: 'Company Network Implementation',
      description: 'Used Packet Tracer to build a small office network with VLANs for different departments.',
      icon: Network,
      tech: ['Cisco Packet Tracer', 'VLANs', 'Networking'],
      features: [
        'Created two separate networks (VLANs)',
        'Configured routing and switching',
        'Implemented security protocols',
      ],
      links: {
        demo: '#',
        github: 'https://github.com/vedprakas3',
      },
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with React, TypeScript, and Tailwind CSS with GSAP animations.',
      icon: Code2,
      tech: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
      features: [
        'Smooth scroll animations',
        'Responsive design',
        'Modern UI/UX',
      ],
      links: {
        demo: '#',
        github: 'https://github.com/vedprakas3/Cofriendbhart',
      },
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full py-16 sm:py-20 lg:py-24 bg-dark-secondary ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <span className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
            My Work
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Featured Projects
          </h2>
        </div>

        {/* GitHub Banner */}
        <div
          ref={githubRef}
          className="max-w-xl mx-auto mb-8 sm:mb-10 lg:mb-12"
        >
          <a
            href="https://github.com/vedprakas3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            <span className="text-text-primary text-sm sm:text-base">View all projects on</span>
            <span className="text-gold font-medium text-sm sm:text-base hover:underline">GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-secondary" />
          </a>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card p-5 sm:p-6 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gold/10 flex items-center justify-center">
                  <project.icon className="w-4 h-4 sm:w-5 text-gold" />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 tap-target"
                    title="View Code"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={project.links.demo}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 tap-target"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              <h3 className="text-text-primary font-semibold text-base sm:text-lg mb-2 hover:text-gold transition-colors">
                {project.title}
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gold/10 text-gold text-[10px] sm:text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-1 sm:space-y-1.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-text-secondary/80">
                    <span className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
