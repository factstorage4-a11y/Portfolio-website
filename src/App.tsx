import { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from 'next-themes';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

// Components
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import PageLoader from './components/PageLoader';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import SnapnestX from './sections/SnapnestX';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsReady(true), 500);
    }, 2500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <AnimatePresence mode="wait">
          {isLoading && <PageLoader />}
        </AnimatePresence>

        {isReady && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <Navigation />
            
            <main className="relative">
              <Hero />
              <About />
              <Projects />
              <SnapnestX />
              <Skills />
              <Contact />
            </main>
            
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
