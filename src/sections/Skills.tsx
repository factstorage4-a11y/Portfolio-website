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
  const skillsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Categories animation
      const categories = categoriesRef.current?.querySelectorAll('.category-item');
      if (categories) {
        gsap.fromTo(
          categories,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 90%',
              end: 'top 70%',
              scrub: 0.3,
            },
          }
        );
      }

      // Skills animation
      const skillItems = skillsRef.current?.querySelectorAll('.skill-item');
      if (skillItems) {
        gsap.fromTo(
          skillItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsRef.current,
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
    { name: 'DSA', category: 'CS Fundamentals', icon: Cpu, level: 70 },
    { name: 'OOPS', category: 'CS Fundamentals', icon: Layers, level: 75 },
    { name: 'RDBMS', category: 'Database', icon: Database, level: 70 },
    { name: 'Linux', category: 'System', icon: Terminal, level: 65 },
  ];

  const categories = [
    { name: 'Programming', count: 2, icon: Code2 },
    { name: 'Web Dev', count: 2, icon: Globe },
    { name: 'CS Fundamentals', count: 2, icon: Cpu },
    { name: 'Database & System', count: 2, icon: Server },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
            What I Know
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Technical Skills
          </h2>
        </div>

        {/* Categories */}
        <div ref={categoriesRef} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-item flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <cat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
              <span className="text-text-primary text-xs sm:text-sm">{cat.name}</span>
              <span className="text-gold text-[10px] sm:text-xs">({cat.count})</span>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          ref={skillsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3 sm:mb-4">
                <skill.icon className="w-4 h-4 sm:w-5 text-gold" />
              </div>
              
              <p className="text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider mb-1">
                {skill.category}
              </p>
              
              <h3 className="text-text-primary font-semibold text-sm sm:text-base mb-2 sm:mb-3">
                {skill.name}
              </h3>
              
              {/* Progress bar */}
              <div className="h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold/70 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              
              <p className="text-gold text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-medium">
                {skill.level}%
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-10 sm:mt-14 lg:mt-16 text-center max-w-xl mx-auto px-4">
          <p className="text-text-secondary text-sm sm:text-base">
            Continuously learning and expanding my skill set. Currently exploring 
            advanced networking concepts, machine learning, and web development frameworks.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
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
