import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProofProps {
  className?: string;
}

const Proof = ({ className = '' }: ProofProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '-10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );

      // Underline draw animation
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen bg-dark py-[14vh] ${className}`}
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Card */}
          <div
            ref={imageRef}
            className="relative rounded-[10px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
          >
            <div className="aspect-[4/5] lg:aspect-auto lg:h-[56vh]">
              <img
                src="/images/cabin-detail.jpg"
                alt="Luxury cabin detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="font-display text-[clamp(48px,6vw,96px)] font-bold text-gold leading-none tracking-[-0.02em]">
              5K+ flights
            </h2>

            <p className="mt-6 text-[clamp(14px,1.2vw,18px)] text-text-secondary leading-relaxed max-w-md">
              Successfully arranged. Each journey reflects years of expertise, precision, and trust—from last-minute charters to intercontinental business routes.
            </p>

            <button className="mt-8 group inline-flex items-center gap-2 text-gold hover:text-text-primary transition-colors duration-300">
              <span className="relative">
                Learn more
                <span
                  ref={underlineRef}
                  className="absolute bottom-0 left-0 w-full h-px bg-gold origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
