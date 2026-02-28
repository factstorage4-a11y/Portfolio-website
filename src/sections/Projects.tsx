import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample projects data - will be replaced with API fetch
const sampleProjects = [
  {
    _id: '1',
    title: 'Student Result Management System',
    description: 'A comprehensive CLI-based system using file handling for storing and retrieving student result records. Built with C++ featuring secure data storage and efficient retrieval mechanisms.',
    techStack: ['C++', 'File Handling', 'Data Structures'],
    githubLink: 'https://github.com/vedprakasharya',
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    featured: true,
  },
  {
    _id: '2',
    title: 'Company Network Implementation',
    description: 'Designed and implemented a complete small office network using Cisco Packet Tracer. Created separate VLANs for different departments with proper security configurations.',
    techStack: ['Cisco Packet Tracer', 'VLAN', 'Networking', 'Security'],
    githubLink: 'https://github.com/vedprakasharya',
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    featured: true,
  },
  {
    _id: '3',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, and dynamic content management.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubLink: 'https://github.com/vedprakasharya',
    liveLink: 'https://vedarya.dev',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    featured: false,
  },
  {
    _id: '4',
    title: 'Database Management System',
    description: 'A relational database management system project demonstrating SQL queries, normalization, and database design principles for efficient data storage.',
    techStack: ['SQL', 'MySQL', 'Database Design', 'ER Diagrams'],
    githubLink: 'https://github.com/vedprakasharya',
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featured: false,
  },
];

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  featured: boolean;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="project-card relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
      />
      
      <div className="relative glass rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Featured badge */}
          {project.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              asChild
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            {project.liveLink && (
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500"
                asChild
              >
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [projects] = useState<Project[]>(sampleProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 6;

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
          >
            My Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for building 
            innovative solutions. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl"
            asChild
          >
            <a
              href="https://github.com/vedprakasharya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View All on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
