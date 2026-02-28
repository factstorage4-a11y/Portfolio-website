import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  {
    category: 'Programming',
    items: [
      { name: 'C', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'DSA', level: 75 },
      { name: 'OOPs', level: 80 },
    ],
  },
  {
    category: 'Web Development',
    items: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'React', level: 70 },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'SQL', level: 80 },
      { name: 'RDBMS', level: 75 },
      { name: 'Linux', level: 70 },
      { name: 'Git', level: 75 },
    ],
  },
  {
    category: 'Networking',
    items: [
      { name: 'Cisco CCNA', level: 75 },
      { name: 'VLAN', level: 80 },
      { name: 'VPN', level: 70 },
      { name: 'Security', level: 65 },
    ],
  },
];

const features = [
  {
    title: 'Problem Solving',
    description: 'Strong analytical skills with the ability to break down complex problems into manageable solutions. Experienced in algorithm design and optimization.',
  },
  {
    title: '24/7 Learning',
    description: 'Committed to continuous improvement and staying updated with the latest technologies. Always eager to learn new skills and adapt to changing requirements.',
  },
  {
    title: 'Clean Code',
    description: 'Writing maintainable, well-documented code following best practices. Focus on readability, efficiency, and scalability in every project.',
  },
  {
    title: 'Efficient',
    description: 'Optimizing performance and resource usage. From code efficiency to system design, ensuring solutions are fast, reliable, and cost-effective.',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section relative min-h-screen py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              Expertise
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light"
          >
            <span className="block">Skills that</span>
            <span className="block text-white/60">evolve with you</span>
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/10 mb-32">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + groupIndex * 0.1 }}
              className="bg-[#0d0d0d] p-8 lg:p-12"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
                {skillGroup.category}
              </h3>
              <div className="space-y-6">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-white/40 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1, 
                          delay: 0.5 + groupIndex * 0.1 + skillIndex * 0.1,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="h-full bg-gradient-to-r from-[#c9a962] to-[#e8d5a3]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-white/50 mb-12"
          >
            A Better Way to Code
          </motion.h3>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-px bg-white/10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="feature-card bg-[#0d0d0d]"
            >
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Technologies', value: '15+' },
            { label: 'Projects', value: '10+' },
            { label: 'Certifications', value: '5+' },
            { label: 'Learning Hours', value: '2000+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-light text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
