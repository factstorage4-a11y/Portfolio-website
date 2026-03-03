import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DestinationsProps {
  className?: string;
}

const Destinations = ({ className = '' }: DestinationsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        watermarkRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 0.1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      const rowA = marqueeRef.current?.querySelector('.marquee-row-a');
      const rowB = marqueeRef.current?.querySelector('.marquee-row-b');

      scrollTl.fromTo(
        rowA,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        rowB,
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        captionRef.current,
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30%-70%): Hold - marquee continues via CSS

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        marqueeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { opacity: 0.1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const destinations = [
    'London', 'Dubai', 'New York', 'Paris', 'Singapore',
    'Tokyo', 'Miami', 'Milan', 'Sydney', 'São Paulo',
    'Berlin', 'Doha', 'Bangkok', 'Shanghai', 'Lagos',
  ];

  return (
    <section
      ref={sectionRef}
      id="global"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Vertical Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.18em] text-gold-dim leading-none">
          GLOBAL
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[10vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(36px,5vw,84px)] font-bold text-text-primary leading-tight tracking-[-0.02em] mb-12"
        >
          Fly anywhere
        </h2>

        {/* Marquee */}
        <div ref={marqueeRef} className="space-y-4 overflow-hidden">
          {/* Row A - Left to Right */}
          <div className="marquee-row-a relative">
            <div className="marquee-track">
              {[...destinations, ...destinations].map((city, index) => (
                <span
                  key={index}
                  className="flex-shrink-0 px-6 py-3 rounded-full border border-white/20 text-text-primary whitespace-nowrap hover:border-gold hover:text-gold transition-colors duration-300 cursor-default"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Row B - Right to Left */}
          <div className="marquee-row-b relative">
            <div className="marquee-track-reverse">
              {[...destinations.slice().reverse(), ...destinations.slice().reverse()].map((city, index) => (
                <span
                  key={index}
                  className="flex-shrink-0 px-6 py-3 rounded-full border border-white/20 text-text-primary whitespace-nowrap hover:border-gold hover:text-gold transition-colors duration-300 cursor-default"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Caption */}
        <p
          ref={captionRef}
          className="mt-12 text-text-secondary text-sm max-w-md"
        >
          Door-to-door coordination across continents.
        </p>
      </div>
    </section>
  );
};

export default Destinations;
