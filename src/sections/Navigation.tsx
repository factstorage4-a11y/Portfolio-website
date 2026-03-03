import { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-dark/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-lg font-bold tracking-[0.15em] text-text-primary hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            VED<span className="text-gold">.</span>ARYA
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Social Icons */}
            <a
              href="https://github.com/vedprakas3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/vedpra260"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-gold ml-2"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-dark/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-display font-semibold text-text-primary hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          
          {/* Mobile Social Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/vedprakas3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/vedpra260"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-gold mt-8"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
