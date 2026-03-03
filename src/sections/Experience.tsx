import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Network, Brain, CheckCircle2, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  className?: string;
}

const Experience = ({ className = '' }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Experience cards animation
      const cards = cardsRef.current?.querySelectorAll('.exp-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '8vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.3,
            },
          }
        );
      }

      // Stats animation
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        gsap.fromTo(
          stats,
          { y: '4vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.3,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: 'Cisco Certified Network Associate (CCNA)',
      company: 'Edcreate Foundation & Cisco Networking Academy',
      location: 'Bihar Institute of Public Administration and Rural Development, Patna',
      duration: 'May 2025 – June 2025',
      icon: Network,
      description: 'Practical experience with Cisco Packet Tracer',
      achievements: [
        'Configured routing, switching (VLANs), and security (Firewall/VPN)',
        'Performed network troubleshooting and design',
      ],
    },
    {
      title: 'Data Science & AI Intern',
      company: 'YBI Foundation',
      location: 'Online Mode',
      duration: 'Internship',
      icon: Brain,
      description: 'Learned data handling, basics of machine learning, and AI concepts',
      achievements: [
        'Explored tools like Jupyter Notebook for hands-on exercises',
        'Performed basic data visualization tasks',
      ],
    },
  ];

  const stats = [
    { value: '2+', label: 'Certifications' },
    { value: '2', label: 'Internships' },
    { value: '3+', label: 'Years Learning' },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative min-h-screen bg-dark-secondary py-[12vh] overflow-hidden ${className}`}
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(60px,8vw,140px)] font-black tracking-[0.15em] text-gold-dim leading-none">
          EXPERIENCE
        </div>
      </div>

      <div className="w-full px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            My Journey
          </span>
          <h2 className="font-display text-[clamp(28px,3.6vw,56px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Work Experience
          </h2>
        </div>

        {/* Experience Cards */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="exp-card p-8 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <exp.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold text-lg">
                      {exp.title}
                    </h3>
                    <p className="text-gold text-sm mt-1">
                      {exp.company}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-text-secondary/60 text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.duration}
                </span>
              </div>

              <p className="text-text-secondary text-sm mb-4">
                {exp.description}
              </p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary/80">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="font-display text-[clamp(40px,4vw,64px)] font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
