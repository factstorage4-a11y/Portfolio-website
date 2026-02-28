import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/vedprakasharya', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/vedpra260', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0d0d0d] border-t border-white/10">
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-24">
          {/* Left - Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-light mb-4">Ved Prakash Arya</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Computer Science student at Bihar Engineering University, Patna. 
                Passionate about building innovative solutions and creating 
                impactful digital experiences.
              </p>
            </motion.div>
          </div>

          {/* Center - Links */}
          <div className="flex flex-col items-start lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-white/50 hover:text-white transition-colors text-sm"
              >
                About
              </a>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-white/50 hover:text-white transition-colors text-sm"
              >
                Projects
              </a>
              <a 
                href="#skills" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-white/50 hover:text-white transition-colors text-sm"
              >
                Skills
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-white/50 hover:text-white transition-colors text-sm"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* Right - Social */}
          <div className="flex flex-col items-start lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                Connect With Me
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Ved Prakash Arya. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="text-white/40 hover:text-white text-sm transition-colors"
          >
            Back to Top ↑
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
