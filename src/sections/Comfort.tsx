import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ComfortProps {
  className?: string;
}

const Comfort = ({ className = '' }: ComfortProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
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

      const lines = contentRef.current?.querySelectorAll('.line');
      if (lines) {
        scrollTl.fromTo(
          lines,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.05
        );
      }

      const cta = contentRef.current?.querySelector('.cta-button');
      if (cta) {
        scrollTl.fromTo(
          cta,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        );
      }

      scrollTl.fromTo(
        contactRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contactRef.current,
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
          src="/images/cabin-aisle.jpg"
          alt="Cabin aisle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/30" />
      </div>

      {/* Vertical Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.18em] text-gold-dim leading-none">
          CONTROL
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-[10vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <h2 className="font-display text-[clamp(32px,4vw,72px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
              <span className="line block">Fly anywhere with</span>
              <span className="line block">total comfort and</span>
              <span className="line block text-gold">control</span>
            </h2>

            <button
              onClick={scrollToContact}
              className="cta-button btn-gold mt-10"
            >
              Book the Flight
            </button>
          </div>

          {/* Contact Card */}
          <div
            ref={contactRef}
            className="bg-dark/80 backdrop-blur-md rounded-[10px] p-6 lg:p-8 border border-white/10"
          >
            <h3 className="text-sm text-text-secondary uppercase tracking-wider mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:info@jeskojets.com"
                className="flex items-center gap-3 text-text-primary hover:text-gold transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-gold" />
                <span>info@jeskojets.com</span>
              </a>
              <a
                href="tel:+971544325050"
                className="flex items-center gap-3 text-text-primary hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-gold" />
                <span>+971 54 432 5050</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comfort;
