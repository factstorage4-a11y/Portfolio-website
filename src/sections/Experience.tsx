import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, Brain, CheckCircle2, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  className?: string;
}

const Experience = ({ className = '' }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Experience cards animation
      const cards = cardsRef.current?.querySelectorAll('.exp-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 55%',
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
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
              end: 'top 70%',
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
      className={`relative w-full py-16 sm:py-20 lg:py-24 bg-dark-secondary ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
            My Journey
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Work Experience
          </h2>
        </div>

        {/* Experience Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="exp-card p-5 sm:p-6 lg:p-8 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <exp.icon className="w-5 h-5 sm:w-6 text-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-text-primary font-semibold text-sm sm:text-base lg:text-lg">
                    {exp.title}
                  </h3>
                  <p className="text-gold text-xs sm:text-sm mt-0.5 sm:mt-1">
                    {exp.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 sm:mb-4 text-text-secondary/60 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.duration}
                </span>
              </div>

              <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">
                {exp.description}
              </p>

              <ul className="space-y-1.5 sm:space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary/80">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold flex-shrink-0 mt-0.5" />
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
          className="mt-10 sm:mt-14 lg:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-text-secondary uppercase tracking-wider mt-1 sm:mt-2">
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
