import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PawPrint, Clock, Sparkles, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturesProps {
  className?: string;
}

const Features = ({ className = '' }: FeaturesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
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

      // Feature cards animation
      const cards = gridRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { x: '8vw', opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'top 45%',
              scrub: 0.3,
            },
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
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

  const features = [
    {
      icon: PawPrint,
      title: 'Pets',
      description: 'Comfortable, safe travel for your companions.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Last-minute changes handled in minutes.',
    },
    {
      icon: Sparkles,
      title: 'Onboard Services',
      description: 'Dining, entertainment, connectivity.',
    },
    {
      icon: Zap,
      title: 'Efficient',
      description: 'Optimized routes and ground handling.',
    },
  ];

  const stats = [
    { value: '174', label: 'Countries supported' },
    { value: '5,000+', label: 'Missions completed' },
    { value: '24/7', label: 'Support desk' },
  ];

  return (
    <section
      ref={sectionRef}
      id="advantages"
      className={`relative min-h-screen bg-dark-secondary py-[10vh] ${className}`}
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Heading */}
          <div ref={headingRef}>
            <h2 className="font-display text-[clamp(32px,4vw,72px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
              A Better Way to Fly
            </h2>
            <p className="mt-6 text-[clamp(14px,1.2vw,18px)] text-text-secondary leading-relaxed max-w-md">
              From pets to paperwork, we handle the details—so you can step onboard and relax.
            </p>
          </div>

          {/* Right Features Grid */}
          <div ref={gridRef} className="grid grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-5 lg:p-6 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-gold mb-4" />
                <h3 className="text-text-primary font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="mt-16 lg:mt-24 flex flex-wrap justify-center gap-8 lg:gap-16"
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

export default Features;
