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

      // Watermark entrance (desktop only)
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
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.02 },
          '-=0.4'
        );
      }

      // Title entrance
      tl.fromTo(
        titleRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Description entrance
      tl.fromTo(
        descRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // CTA buttons entrance
      tl.fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7 },
        '-=0.5'
      );

      // Socials entrance
      tl.fromTo(
        socialsRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      );
    }, sectionRef);

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
      className={`relative w-full min-h-screen overflow-hidden flex items-center py-20 lg:py-0 ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-secondary" />
      
      {/* Animated particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
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
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C8A45C 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Vertical Watermark Text - Desktop only */}
      <div
        ref={watermarkRef}
        className="absolute left-[4vw] top-[10vh] hidden lg:block"
        style={{ opacity: 0 }}
      >
        <div className="vertical-text font-display text-[clamp(60px,8vw,140px)] font-black tracking-[0.15em] text-gold-dim leading-none">
          DEVELOPER
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              ref={nameRef}
              className="font-display text-[clamp(36px,10vw,80px)] lg:text-[clamp(48px,5vw,90px)] font-bold text-text-primary leading-[0.95] tracking-[-0.02em]"
            >
              <span className="block">
                {firstName.split('').map((char, i) => (
                  <span key={i} className="letter inline-block">
                    {char}
                  </span>
                ))}
              </span>
              <span className="block text-gold mt-1 lg:mt-2">
                {lastName.split('').map((char, i) => (
                  <span key={i} className="letter inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <p
              ref={titleRef}
              className="mt-4 lg:mt-6 text-base sm:text-lg text-text-secondary uppercase tracking-[0.15em] lg:tracking-[0.2em]"
              style={{ opacity: 0 }}
            >
              BTech CSE (AI) Student
            </p>

            <p
              ref={descRef}
              className="mt-4 lg:mt-6 text-sm sm:text-base text-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0"
              style={{ opacity: 0 }}
            >
              Motivated Computer Science student with a keen interest in programming, 
              cybersecurity, and emerging technologies. Based in Gaya, Bihar.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              style={{ opacity: 0 }}
            >
              <button
                onClick={scrollToContact}
                className="btn-gold flex items-center justify-center gap-2"
              >
                <span>Hire Me</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-text-primary text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-gold hover:text-gold flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Social Links */}
            <div
              ref={socialsRef}
              className="mt-6 lg:mt-8 flex items-center justify-center lg:justify-start gap-3"
              style={{ opacity: 0 }}
            >
              <a
                href="mailto:vedprakasharya9973@gmail.com"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110 tap-target"
                title="Email"
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vedpra260"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110 tap-target"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="tel:+916202692971"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110 tap-target"
                title="Phone: +91 6202692971"
              >
                <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110 tap-target"
                title="GitHub"
              >
                <Github className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 flex justify-center"
            style={{ opacity: 0 }}
          >
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 rounded-full border-2 border-gold/30 animate-pulse" />
              <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 rounded-full border border-gold/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Profile image with carousel */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-2 sm:border-4 border-gold/50 shadow-[0_0_40px_rgba(200,164,92,0.3)] relative">
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
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 lg:-bottom-4 lg:-right-4 bg-dark-secondary border border-gold/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gold text-xs sm:text-sm font-medium">Open to Work</span>
              </div>

              {/* Image indicators */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 tap-target ${
                      index === currentImage ? 'bg-gold w-4 sm:w-5' : 'bg-white/30'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 tap-target group"
        aria-label="Scroll to about section"
      >
        <span className="text-xs text-text-secondary tracking-widest uppercase group-hover:text-gold transition-colors">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary group-hover:text-gold animate-bounce-subtle transition-colors" />
      </button>
    </section>
  );
};

export default Hero;
