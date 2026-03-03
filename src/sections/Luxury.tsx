import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UtensilsCrossed, Wifi, BedDouble, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LuxuryProps {
  className?: string;
}

const Luxury = ({ className = '' }: LuxuryProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
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
        { scale: 1.08, opacity: 0.85 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 0.1, ease: 'none' },
        0
      );

      const words = contentRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(
          words,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'none' },
          0.05
        );
      }

      const subContent = contentRef.current?.querySelectorAll('.sub-content');
      if (subContent) {
        scrollTl.fromTo(
          subContent,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'none' },
          0.15
        );
      }

      scrollTl.fromTo(
        featuresRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        featuresRef.current,
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
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: UtensilsCrossed, label: 'Fine dining' },
    { icon: Wifi, label: 'High-speed Wi-Fi' },
    { icon: BedDouble, label: 'Private suites' },
    { icon: Users, label: 'Personal crew' },
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
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/cabin-interior.jpg"
          alt="Luxury cabin interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/30" />
      </div>

      {/* Vertical Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.18em] text-gold-dim leading-none">
          LUXURY
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-[10vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <h2 className="font-display text-[clamp(32px,4vw,72px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
              <span className="word inline-block">Luxury</span>{' '}
              <span className="word inline-block">that</span>{' '}
              <span className="word inline-block">moves</span>
              <br />
              <span className="word inline-block text-gold">with</span>{' '}
              <span className="word inline-block text-gold">you</span>
            </h2>

            <p className="sub-content mt-6 text-[clamp(14px,1.2vw,18px)] text-text-secondary leading-relaxed max-w-[36vw]">
              From takeoff to landing, every detail is tuned to your preferences—quiet cabins, personalized service, and space to think, rest, or celebrate.
            </p>

            <button
              onClick={scrollToContact}
              className="sub-content btn-gold mt-8"
            >
              Request a Quote
            </button>
          </div>

          {/* Features Card */}
          <div
            ref={featuresRef}
            className="bg-dark/80 backdrop-blur-md rounded-[10px] p-6 lg:p-8 border border-white/10"
          >
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                >
                  <feature.icon className="w-6 h-6 text-gold" />
                  <span className="text-text-primary font-medium">
                    {feature.label}
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

export default Luxury;
