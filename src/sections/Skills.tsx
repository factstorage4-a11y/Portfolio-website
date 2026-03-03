import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Terminal, Globe, Cpu, FileCode, Layers, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  className?: string;
}

const Skills = ({ className = '' }: SkillsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Watermark animation
      gsap.fromTo(
        watermarkRef.current,
        { x: '10vw', opacity: 0 },
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

      // Skills animation
      const skillItems = skillsRef.current?.querySelectorAll('.skill-item');
      if (skillItems) {
        gsap.fromTo(
          skillItems,
          { y: '6vh', opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.3,
            },
          }
        );
      }

      // Categories animation
      const categories = categoriesRef.current?.querySelectorAll('.category-item');
      if (categories) {
        gsap.fromTo(
          categories,
          { x: '-4vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
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

  const skills = [
    { name: 'C', category: 'Programming', icon: Code2, level: 85 },
    { name: 'C++', category: 'Programming', icon: Code2, level: 80 },
    { name: 'HTML', category: 'Web', icon: Globe, level: 90 },
    { name: 'CSS', category: 'Web', icon: FileCode, level: 85 },
    { name: 'DSA (Basic)', category: 'CS Fundamentals', icon: Cpu, level: 70 },
    { name: 'OOPS', category: 'CS Fundamentals', icon: Layers, level: 75 },
    { name: 'RDBMS', category: 'Database', icon: Database, level: 70 },
    { name: 'Linux', category: 'System', icon: Terminal, level: 65 },
  ];

  const categories = [
    { name: 'Programming', count: 2, icon: Code2 },
    { name: 'Web Development', count: 2, icon: Globe },
    { name: 'CS Fundamentals', count: 2, icon: Cpu },
    { name: 'Database & System', count: 2, icon: Server },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative min-h-screen bg-dark py-[12vh] overflow-hidden ${className}`}
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute right-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.15em] text-gold-dim leading-none">
          SKILLS
        </div>
      </div>

      <div className="w-full px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            What I Know
          </span>
          <h2 className="font-display text-[clamp(28px,3.6vw,56px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Technical Skills
          </h2>
        </div>

        {/* Categories */}
        <div ref={categoriesRef} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-item flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <cat.icon className="w-4 h-4 text-gold" />
              <span className="text-text-primary text-sm">{cat.name}</span>
              <span className="text-gold text-xs">({cat.count})</span>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          ref={skillsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item p-6 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <skill.icon className="w-5 h-5 text-gold" />
              </div>
              
              <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
                {skill.category}
              </p>
              
              <h3 className="text-text-primary font-semibold mb-3">
                {skill.name}
              </h3>
              
              {/* Progress bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold/70 rounded-full transition-all duration-1000 ease-out group-hover:from-gold group-hover:to-gold"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              
              <p className="text-gold text-xs mt-2 font-medium">
                {skill.level}%
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-text-secondary">
            Continuously learning and expanding my skill set. Currently exploring 
            advanced networking concepts, machine learning, and web development frameworks.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs">Learning Python</span>
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs">Exploring AI/ML</span>
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs">Cybersecurity</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
