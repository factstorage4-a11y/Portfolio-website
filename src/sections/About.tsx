import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar, Target, Code2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  className?: string;
}

const About = ({ className = '' }: AboutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text block animation
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        }
      );

      // Highlights animation
      const highlights = highlightsRef.current?.querySelectorAll('.highlight-card');
      if (highlights) {
        gsap.fromTo(
          highlights,
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.3,
            },
          }
        );
      }

      // Education cards animation
      const cards = educationRef.current?.querySelectorAll('.edu-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: educationRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.3,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering (AI)',
      school: 'Government Engineering College, Lakhisarai',
      year: '2022 – 2026',
      icon: GraduationCap,
    },
    {
      degree: 'Class 12 (BSEB)',
      field: 'Science Stream',
      school: 'MSY College',
      year: '2022',
      icon: Calendar,
    },
    {
      degree: 'Class 10 (CBSE)',
      field: 'General',
      school: 'Almumin International School',
      year: '2020',
      icon: Calendar,
    },
  ];

  const highlights = [
    { icon: Code2, label: 'Programming', value: 'C, C++, Python' },
    { icon: Target, label: 'Focus', value: 'AI & Cybersecurity' },
    { icon: Sparkles, label: 'Passion', value: 'Problem Solving' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {/* Left - About Text */}
          <div ref={textRef} className="w-full lg:w-1/2 lg:max-w-xl">
            <span className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
              Who I Am
            </span>
            
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
              About Me
            </h2>

            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              <p>
                I am a motivated and curious Computer Science student with a keen interest 
                in programming, cybersecurity, and emerging technologies. Currently pursuing 
                my B.Tech in Computer Science and Engineering (AI) from Government Engineering 
                College, Lakhisarai.
              </p>
              <p>
                I am actively looking for an internship opportunity to gain hands-on experience, 
                apply classroom knowledge, and grow under professional guidance. My passion lies 
                in solving real-world problems through technology.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-2 text-text-secondary text-sm sm:text-base">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
              <span>Gaya, Bihar, India</span>
            </div>

            {/* Highlights */}
            <div ref={highlightsRef} className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-card p-3 sm:p-4 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 text-center hover:border-gold/30 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gold mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-text-primary text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Education */}
          <div ref={educationRef} className="w-full lg:w-1/2 lg:max-w-lg space-y-3 sm:space-y-4">
            <h3 className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">
              Education
            </h3>
            
            {education.map((edu, index) => (
              <div
                key={index}
                className="edu-card p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <edu.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-text-primary font-semibold text-sm sm:text-base">
                      {edu.degree}
                    </h4>
                    <p className="text-gold text-xs sm:text-sm mt-0.5 sm:mt-1">
                      {edu.field}
                    </p>
                    <p className="text-text-secondary text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
                      {edu.school}
                    </p>
                    <p className="text-text-secondary/60 text-[10px] sm:text-xs mt-1 sm:mt-2">
                      {edu.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
