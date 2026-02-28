import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Letter animation for large text
const LetterReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.05,
            delay: delay + index * 0.01,
          }}
          className="inline"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section relative min-h-screen py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Large Intro Text */}
        <div className="max-w-6xl mx-auto mb-32">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white/90"
          >
            <LetterReveal 
              text="Ved Prakash Arya is a Computer Science student at Bihar Engineering University, Patna, with a passion for building innovative solutions and creating impactful digital experiences. From coding fundamentals to full-stack development, every project reflects dedication to excellence." 
              delay={0.3}
            />
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mb-32">
          {[
            { label: 'Projects Completed', value: '10+' },
            { label: 'Years of Learning', value: '3+' },
            { label: 'Certifications', value: '5+' },
            { label: 'Dedication', value: '100%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-[#0d0d0d] p-8 lg:p-12"
            >
              <div className="text-4xl lg:text-6xl font-light text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two Column Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
              Direct Access to Excellence
            </h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Fly beyond boundaries with innovative solutions. My approach ensures seamless, 
              personalized development experiences — from the first concept to deployment. 
              Every project is tailored to your requirements, timeline, and vision.
            </p>
            <div className="line-divider" />
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
              Your Freedom to Create
            </h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              I value your vision above all. My development process gives you the freedom 
              to innovate, iterate, and launch — without compromise. From web applications 
              to system design, every solution is built with precision and care.
            </p>
            <div className="line-divider" />
          </motion.div>
        </div>

        {/* Education & Experience */}
        <div className="mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-white/50 mb-12"
          >
            Education & Experience
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="border border-white/10 p-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                2022 — 2026
              </div>
              <h4 className="text-xl font-medium text-white mb-2">
                B.Tech in Computer Science & Engineering
              </h4>
              <p className="text-white/50">
                Bihar Engineering University, Patna
              </p>
            </motion.div>

            {/* Experience 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="border border-white/10 p-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                May 2025 — June 2025
              </div>
              <h4 className="text-xl font-medium text-white mb-2">
                CCNA Trainee
              </h4>
              <p className="text-white/50">
                Edcreate Foundation & Cisco Networking Academy
              </p>
            </motion.div>

            {/* Experience 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="border border-white/10 p-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                Online Mode
              </div>
              <h4 className="text-xl font-medium text-white mb-2">
                Data Science Intern
              </h4>
              <p className="text-white/50">
                YBI Foundation
              </p>
            </motion.div>

            {/* Startup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="border border-white/10 p-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                Founder
              </div>
              <h4 className="text-xl font-medium text-white mb-2">
                SnapnestX
              </h4>
              <p className="text-white/50">
                Private content creation space platform
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
