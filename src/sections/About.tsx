import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Code } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Bihar Engineering University, Patna',
    year: '2022 - 2026',
    description: 'Pursuing B.Tech with focus on AI, Data Structures, and Software Engineering.',
    icon: GraduationCap,
  },
  {
    degree: 'Senior Secondary (Class 12)',
    institution: 'MSY College, BSEB',
    year: '2022',
    description: 'Completed senior secondary education with Science stream.',
    icon: Award,
  },
  {
    degree: 'Secondary (Class 10)',
    institution: 'Almumin International School, CBSE',
    year: '2020',
    description: 'Completed secondary education with excellent academic record.',
    icon: Award,
  },
];

const experience = [
  {
    role: 'CCNA Trainee',
    company: 'Edcreate Foundation & Cisco Networking Academy',
    duration: 'May 2025 - June 2025',
    description: 'Practical experience with Cisco Packet Tracer. Configured routing, switching (VLANs), and security (Firewall/VPN). Performed network troubleshooting and design.',
    icon: Briefcase,
  },
  {
    role: 'Data Science Intern',
    company: 'YBI Foundation',
    duration: 'Online Mode',
    description: 'Learned data handling, basics of machine learning, and AI concepts. Explored tools like Jupyter Notebook for hands-on exercises.',
    icon: Code,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Motivated and curious Computer Science student with a keen interest in programming, 
            cybersecurity, and emerging technologies. Looking for opportunities to gain hands-on 
            experience and grow under professional guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
              </div>
              Education
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px timeline-line" />
              
              <div className="space-y-8">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-14"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-indigo-500 flex items-center justify-center timeline-dot"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <item.icon className="w-4 h-4 text-indigo-500" />
                    </motion.div>
                    
                    {/* Content card */}
                    <motion.div
                      className="glass rounded-xl p-5 hover:bg-primary/5 transition-colors"
                      whileHover={{ x: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="text-sm text-primary font-medium">{item.year}</span>
                      <h4 className="text-lg font-semibold mt-1">{item.degree}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.institution}</p>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-500" />
              </div>
              Experience
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px timeline-line" />
              
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-14"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-purple-500 flex items-center justify-center timeline-dot"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <item.icon className="w-4 h-4 text-purple-500" />
                    </motion.div>
                    
                    {/* Content card */}
                    <motion.div
                      className="glass rounded-xl p-5 hover:bg-primary/5 transition-colors"
                      whileHover={{ x: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="text-sm text-primary font-medium">{item.duration}</span>
                      <h4 className="text-lg font-semibold mt-1">{item.role}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.company}</p>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '10+', label: 'Projects Completed' },
            { value: '3+', label: 'Years of Learning' },
            { value: '5+', label: 'Certifications' },
            { value: '100%', label: 'Dedication' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                className="text-3xl md:text-4xl font-bold text-gradient block mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
