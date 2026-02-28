import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Letter animation component
const AnimatedLetter = ({ letter, index, delay = 0 }: { letter: string; index: number; delay?: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1,
      delay: delay + index * 0.03,
      ease: [0.4, 0, 0.2, 1],
    }}
    className="inline-block"
  >
    {letter === ' ' ? '\u00A0' : letter}
  </motion.span>
);

// Word animation component
const AnimatedWord = ({ word, delay = 0 }: { word: string; delay?: number }) => (
  <span className="inline-block mr-[0.25em]">
    {word.split('').map((letter, index) => (
      <AnimatedLetter key={index} letter={letter} index={index} delay={delay} />
    ))}
  </span>
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Parallax effect on scroll
    gsap.to(content, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#141414] to-[#0d0d0d]" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,98,0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-32">
          
          {/* Left Side - Main Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight">
                <span className="block">
                  <AnimatedWord word="We" delay={0.5} />
                  <AnimatedWord word="are" delay={0.6} />
                </span>
                <span className="block mt-2">
                  <AnimatedWord word="creation" delay={0.8} />
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-16 max-w-sm"
            >
              <h2 className="text-xl font-medium text-white mb-4">
                Your vision,<br />our expertise
              </h2>
              <div className="line-divider" />
              <p className="text-sm text-white/60 leading-relaxed">
                Every project is designed around your goals, timeline, and ambitions — 
                so you can focus on what truly matters, while we take care of everything else.
              </p>
            </motion.div>
          </div>

          {/* Center - Profile/Image */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              {/* Profile Circle */}
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl lg:text-8xl font-light text-white/20">V</span>
                </div>
              </div>
              
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl -z-10"
                style={{ background: 'radial-gradient(circle, rgba(201,169,98,0.15) 0%, transparent 70%)' }}
              />

              {/* Name label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-white/40">Ved Arya</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Secondary Text */}
          <div className="lg:col-span-5 flex flex-col justify-center items-end text-right">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight">
                <span className="block">
                  <AnimatedWord word="We" delay={0.7} />
                  <AnimatedWord word="are" delay={0.8} />
                </span>
                <span className="block mt-2">
                  <AnimatedWord word="innovation" delay={1.0} />
                </span>
              </h1>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-auto pt-20 flex items-center gap-8"
            >
              <button 
                onClick={scrollToAbout}
                className="scroll-indicator cursor-pointer hover:text-white transition-colors"
              >
                <ChevronDown className="w-4 h-4 scroll-arrow" />
                <span>Scroll down</span>
              </button>
              <div className="w-px h-8 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                To start the journey
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <a 
          href="#contact" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-primary"
        >
          <span>Get In Touch</span>
          <span className="btn-icon">
            <Send className="w-4 h-4" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
