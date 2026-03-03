import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderGit2, Server, Network, ExternalLink, Github, Code2, Database, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  className?: string;
}

const Projects = ({ className = '' }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Watermark animation
      gsap.fromTo(
        watermarkRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        }
      );

      // GitHub banner animation
      gsap.fromTo(
        githubRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: githubRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.3,
          },
        }
      );

      // Projects animation
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { y: '8vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top 80%',
              end: 'top 40%',
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
      className={`relative min-h-screen bg-dark-secondary py-[12vh] overflow-hidden ${className}`}
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(60px,8vw,140px)] font-black tracking-[0.15em] text-gold-dim leading-none">
          PROJECTS
        </div>
      </div>

      <div className="w-full px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            My Work
          </span>
          <h2 className="font-display text-[clamp(28px,3.6vw,56px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Featured Projects
          </h2>
        </div>

        {/* GitHub Banner */}
        <div
          ref={githubRef}
          className="max-w-4xl mx-auto mb-12"
        >
          <a
            href="https://github.com/vedprakas3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
          >
            <Github className="w-6 h-6 text-gold" />
            <span className="text-text-primary">View all projects on</span>
            <span className="text-gold font-medium group-hover:underline">GitHub</span>
            <ExternalLink className="w-4 h-4 text-text-secondary group-hover:text-gold transition-colors" />
          </a>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card p-6 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <project.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
                    title="View Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.links.demo}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <h3 className="text-text-primary font-semibold text-lg mb-2 group-hover:text-gold transition-colors">
                {project.title}
              </h3>

              <p className="text-text-secondary text-sm mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full bg-gold/10 text-gold text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-1.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary/80">
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
