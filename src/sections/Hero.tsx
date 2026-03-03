import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Linkedin, Mail, Phone, Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  className?: string;
}

const Hero = ({ className = '' }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const images = ['/images/profile.jpg', '/images/profile2.jpg'];

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Watermark entrance
      tl.fromTo(
        watermarkRef.current,
        { x: '-6vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 }
      );

      // Name letters entrance
      const letters = nameRef.current?.querySelectorAll('.letter');
      if (letters) {
        tl.fromTo(
          letters,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          '-=0.4'
        );
      }

      // Title entrance
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Description entrance
      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTA buttons entrance
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { x: '10vw', opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8 },
        '-=0.6'
      );

      // Socials entrance
      tl.fromTo(
        socialsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Scroll cue entrance
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            gsap.set([watermarkRef.current, nameRef.current, titleRef.current, descRef.current, imageRef.current, socialsRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
          },
        },
      });

      // EXIT (70%-100%)
      scrollTl.fromTo(
        nameRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        titleRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        descRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        socialsRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        watermarkRef.current,
        { x: 0, opacity: 0.08 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const firstName = 'VED';
  const lastName = 'PRAKASH';

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-secondary" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C8A45C 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Vertical Watermark Text */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
        style={{ opacity: 0 }}
      >
        <div className="vertical-text font-display text-[clamp(80px,10vw,180px)] font-black tracking-[0.15em] text-gold-dim leading-none">
          DEVELOPER
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-[10vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
          {/* Left Content */}
          <div>
            <h1
              ref={nameRef}
              className="font-display text-[clamp(40px,6vw,100px)] font-bold text-text-primary leading-[0.95] tracking-[-0.02em]"
            >
              <span className="block">
                {firstName.split('').map((char, i) => (
                  <span key={i} className="letter inline-block">
                    {char}
                  </span>
                ))}
              </span>
              <span className="block text-gold mt-2">
                {lastName.split('').map((char, i) => (
                  <span key={i} className="letter inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <p
              ref={titleRef}
              className="mt-6 text-lg lg:text-xl text-text-secondary uppercase tracking-[0.2em]"
              style={{ opacity: 0 }}
            >
              BTech CSE (AI) Student
            </p>

            <p
              ref={descRef}
              className="mt-6 text-[clamp(14px,1.2vw,18px)] text-text-secondary leading-relaxed max-w-md"
              style={{ opacity: 0 }}
            >
              Motivated Computer Science student with a keen interest in programming, 
              cybersecurity, and emerging technologies. Based in Gaya, Bihar.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="mt-8 flex flex-wrap gap-4"
              style={{ opacity: 0 }}
            >
              <button
                onClick={scrollToContact}
                className="btn-gold flex items-center gap-2"
              >
                <span>Hire Me</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full border border-white/20 text-text-primary text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-gold hover:text-gold flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Social Links */}
            <div
              ref={socialsRef}
              className="mt-8 flex items-center gap-4"
              style={{ opacity: 0 }}
            >
              <a
                href="mailto:vedprakasharya9973@gmail.com"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vedpra260"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="tel:+916202692971"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                title="Phone: +91 6202692971"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute -inset-4 rounded-full border-2 border-gold/30 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-gold/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -inset-12 rounded-full border border-gold/5" />
              
              {/* Profile image with carousel */}
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gold/50 shadow-[0_0_60px_rgba(200,164,92,0.3)] relative">
                {images.map((img, index) => (
                  <img
                    key={img}
                    src={img}
                    alt="Ved Prakash Arya"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-dark-secondary border border-gold/30 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gold text-sm font-medium">Open to Work</span>
              </div>

              {/* Image indicators */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-gold w-6' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={scrollToAbout}
        style={{ opacity: 0 }}
      >
        <span className="text-xs text-text-secondary tracking-widest uppercase group-hover:text-gold transition-colors">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-text-secondary group-hover:text-gold animate-bounce-subtle transition-colors" />
      </div>
    </section>
  );
};

export default Hero;
