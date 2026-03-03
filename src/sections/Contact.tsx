import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Download, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  className?: string;
}

const Contact = ({ className = '' }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
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
      // GitHub section animation
      gsap.fromTo(
        githubRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: githubRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.3,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.3,
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            end: 'top 60%',
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
      className={`relative w-full py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-[8vw]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
            Let's Work Together
          </h2>
        </div>

        {/* GitHub Section */}
        <div
          ref={githubRef}
          className="max-w-xl mx-auto mb-10 sm:mb-12 lg:mb-14"
        >
          <div className="p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-[10px] bg-gradient-to-r from-gold/10 to-transparent border border-gold/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Github className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-text-primary font-semibold text-base sm:text-lg">Check Out My GitHub</h3>
                  <p className="text-text-secondary text-xs sm:text-sm">Explore my projects and contributions</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <a
                  href="https://github.com/vedprakas3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5"
                >
                  Profile
                </a>
                <a
                  href="https://github.com/vedprakas3/Cofriendbhart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-white/20 text-text-primary text-xs sm:text-sm font-medium transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  Repo
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-10 sm:gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="w-full lg:w-1/2">
            {submitted ? (
              <div className="p-6 sm:p-8 rounded-lg sm:rounded-[10px] bg-gold/10 border border-gold/30 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary text-sm sm:text-base">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-text-secondary mb-1.5 sm:mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-text-secondary mb-1.5 sm:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-text-secondary mb-1.5 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-text-secondary mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-sm">Send Message</span>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="w-full lg:w-1/2 space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:vedprakasharya9973@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 text-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-text-secondary text-xs sm:text-sm">Email</p>
                    <p className="text-text-primary text-sm sm:text-base truncate">vedprakasharya9973@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+916202692971"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs sm:text-sm">Phone</p>
                    <p className="text-text-primary text-sm sm:text-base">+91 62026 92971</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-[10px] bg-white/5 border border-white/10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs sm:text-sm">Location</p>
                    <p className="text-text-primary text-sm sm:text-base">Gaya, Bihar, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                Follow Me
              </h3>
              <div className="flex gap-2 sm:gap-3">
                <a
                  href="https://linkedin.com/in/vedpra260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110 tap-target"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 sm:w-5" />
                </a>
                <a
                  href="https://github.com/vedprakas3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110 tap-target"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 sm:w-5" />
                </a>
              </div>
            </div>

            {/* Download Resume */}
            <a
              href="/images/resume.png"
              download="Ved_Prakash_Arya_Resume.png"
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-[10px] bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 sm:w-5 text-gold" />
              </div>
              <div>
                <p className="text-text-secondary text-xs sm:text-sm">Download</p>
                <p className="text-gold font-medium text-sm sm:text-base">My Resume</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-14 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-text-secondary text-center sm:text-left">
              © 2026 Ved Prakash Arya. All rights reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/vedprakas3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold transition-colors tap-target"
              >
                <Github className="w-4 h-4 sm:w-5" />
              </a>
              <a
                href="https://linkedin.com/in/vedpra260"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-gold transition-colors tap-target"
              >
                <Linkedin className="w-4 h-4 sm:w-5" />
              </a>
              <span className="text-text-secondary/60 text-xs sm:text-sm">
                Built with passion
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
