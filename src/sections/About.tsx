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
  const watermarkRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

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

      // Text block animation
      gsap.fromTo(
        textRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );

      // Highlights animation
      const highlights = highlightsRef.current?.querySelectorAll('.highlight-card');
      if (highlights) {
        gsap.fromTo(
          highlights,
          { y: '4vh', opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 85%',
              end: 'top 55%',
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
          { x: '10vw', opacity: 0, scale: 0.96 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: educationRef.current,
              start: 'top 75%',
              end: 'top 40%',
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
      className={`relative min-h-screen bg-dark py-[12vh] overflow-hidden ${className}`}
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute right-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.15em] text-gold-dim leading-none">
          ABOUT
        </div>
      </div>

      <div className="w-full px-6 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - About Text */}
          <div ref={textRef} className="lg:pt-[4vh]">
            <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
              Who I Am
            </span>
            
            <h2 className="font-display text-[clamp(28px,3.6vw,56px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
              About Me
            </h2>

            <div className="mt-8 space-y-4 text-[clamp(14px,1.2vw,18px)] text-text-secondary leading-relaxed">
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

            <div className="mt-8 flex items-center gap-2 text-text-secondary">
              <MapPin className="w-5 h-5 text-gold" />
              <span>Gaya, Bihar, India</span>
            </div>

            {/* Highlights */}
            <div ref={highlightsRef} className="mt-8 grid grid-cols-3 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-card p-4 rounded-[10px] bg-white/5 border border-white/10 text-center hover:border-gold/30 transition-all duration-300"
                >
                  <item.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-text-secondary text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-text-primary text-sm font-medium mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Education */}
          <div ref={educationRef} className="space-y-4">
            <h3 className="text-gold text-sm uppercase tracking-[0.3em] mb-6">
              Education
            </h3>
            
            {education.map((edu, index) => (
              <div
                key={index}
                className="edu-card p-6 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:translate-x-2"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <edu.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold">
                      {edu.degree}
                    </h4>
                    <p className="text-gold text-sm mt-1">
                      {edu.field}
                    </p>
                    <p className="text-text-secondary text-sm mt-1">
                      {edu.school}
                    </p>
                    <p className="text-text-secondary/60 text-xs mt-2">
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
