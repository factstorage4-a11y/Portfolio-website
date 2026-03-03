import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FleetProps {
  className?: string;
}

const Fleet = ({ className = '' }: FleetProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0.8 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 0.1, ease: 'none' },
        0
      );

      const chars = headlineRef.current?.querySelectorAll('.char');
      if (chars) {
        scrollTl.fromTo(
          chars,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      const subElements = headlineRef.current?.querySelectorAll('.sub-element');
      if (subElements) {
        scrollTl.fromTo(
          subElements,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'none' },
          0.15
        );
      }

      scrollTl.fromTo(
        specsRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-16vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        specsRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { opacity: 0.1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-5vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const specs = [
    { label: 'Maximum operating range', value: '11,263 km' },
    { label: 'Speed', value: '480 knots' },
    { label: 'Passenger capacity', value: 'Up to 12 seats' },
    { label: 'Endurance', value: '14 hrs' },
    { label: 'Baggage capacity', value: '5.52 m³' },
    { label: 'Cruising altitude', value: '15,544 m' },
  ];

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/jet-exterior.jpg"
          alt="Gulfstream 650ER"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/40" />
      </div>

      {/* Vertical Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.18em] text-gold-dim leading-none">
          FLEET
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-[10vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
          {/* Left Content */}
          <div ref={headlineRef}>
            <h2 className="font-display text-[clamp(36px,5vw,84px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
              {'Gulfstream'.split('').map((char, i) => (
                <span key={i} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <br />
              {'650ER'.split('').map((char, i) => (
                <span key={i} className="char inline-block text-gold">
                  {char}
                </span>
              ))}
            </h2>

            <p className="sub-element mt-6 text-lg text-text-secondary uppercase tracking-wider">
              Ultra-long-range aircraft
            </p>

            <button
              onClick={scrollToContact}
              className="sub-element btn-gold mt-8"
            >
              Explore the Fleet
            </button>
          </div>

          {/* Specs Panel */}
          <div
            ref={specsRef}
            className="bg-dark/80 backdrop-blur-md rounded-[10px] p-6 lg:p-8 border border-white/10"
          >
            <h3 className="text-sm text-text-secondary uppercase tracking-wider mb-6">
              Specification
            </h3>
            <div className="space-y-4">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                >
                  <span className="text-text-secondary text-sm">
                    {spec.label}
                  </span>
                  <span className="text-text-primary font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
