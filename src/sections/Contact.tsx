import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const cities = [
  'Patna', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Vadodara', 'Ghaziabad', 'Ludhiana'
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section relative min-h-screen py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      <div className="relative z-10 w-full">
        {/* City Marquee */}
        <div className="mb-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="marquee-container py-8 border-y border-white/10"
          >
            <div className="marquee-content">
              {[...cities, ...cities].map((city, index) => (
                <span key={index} className="city-item">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="px-6 lg:px-12">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white/90 mb-8">
              Successfully delivered projects that reflect dedication, precision, and trust. 
              From academic assignments to real-world applications — every solution ensures 
              quality, efficiency, and excellence.
            </p>
            <div className="line-divider mx-auto" />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8">
                <span className="block">Let's build</span>
                <span className="block text-white/60">something great</span>
              </h2>

              <p className="text-white/60 leading-relaxed mb-12 max-w-md">
                Have a project in mind or want to collaborate? Feel free to reach out. 
                I'm always open to discussing new opportunities and innovative ideas.
              </p>

              <div className="space-y-6">
                <a 
                  href="mailto:vedprakasharya9973@gmail.com"
                  className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>vedprakasharya9973@gmail.com</span>
                </a>

                <a 
                  href="tel:+916202692971"
                  className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 620 269 2971</span>
                </a>

                <div className="flex items-center gap-4 text-white/60">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>Patna, Bihar, India</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center mt-8"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : submitted ? (
                    <span>Message Sent!</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
