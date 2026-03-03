import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Download, ExternalLink, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  className?: string;
}

const Contact = ({ className = '' }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Watermark animation
      gsap.fromTo(
        watermarkRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );

      // GitHub section animation
      gsap.fromTo(
        githubRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: githubRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.3,
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
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
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative min-h-screen bg-dark py-[12vh] overflow-hidden ${className}`}
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-[10vh] hidden lg:block"
      >
        <div className="font-display text-[clamp(100px,15vw,250px)] font-black tracking-[0.1em] text-gold-dim leading-none">
          CONTACT
        </div>
      </div>

      <div className="w-full px-6 lg:px-[8vw] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-[clamp(28px,3.6vw,56px)] font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Let's Work Together
          </h2>
        </div>

        {/* GitHub Section */}
        <div
          ref={githubRef}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="p-6 rounded-[10px] bg-gradient-to-r from-gold/10 to-transparent border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                <Github className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="text-text-primary font-semibold text-lg">Check Out My GitHub</h3>
                <p className="text-text-secondary text-sm">Explore my projects and contributions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Profile</span>
              </a>
              <a
                href="https://github.com/vedprakas3/Cofriendbhart"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-text-primary text-sm font-medium transition-all duration-300 hover:border-gold hover:text-gold flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Repo</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef}>
            {submitted ? (
              <div className="p-8 rounded-[10px] bg-gold/10 border border-gold/30 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            <div>
              <h3 className="text-gold text-sm uppercase tracking-[0.3em] mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:vedprakasharya9973@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Email</p>
                    <p className="text-text-primary">vedprakasharya9973@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+916202692971"
                  className="flex items-center gap-4 p-4 rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Phone</p>
                    <p className="text-text-primary">+91 62026 92971</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-[10px] bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Location</p>
                    <p className="text-text-primary">Gaya, Bihar, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-gold text-sm uppercase tracking-[0.3em] mb-4">
                Follow Me
              </h3>
              <div className="flex gap-3">
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

            {/* Download Resume */}
            <a
              href="/images/resume.png"
              download="Ved_Prakash_Arya_Resume.png"
              className="flex items-center gap-4 p-4 rounded-[10px] bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-text-secondary text-sm">Download</p>
                <p className="text-gold font-medium">My Resume</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              © 2026 Ved Prakash Arya. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/vedpra260"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <span className="text-text-secondary/60 text-sm">
                Designed & Built with passion
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
