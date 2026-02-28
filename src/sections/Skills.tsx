import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Skills data
const skills = [
  { name: 'C', percentage: 85, category: 'Programming' },
  { name: 'C++', percentage: 80, category: 'Programming' },
  { name: 'DSA', percentage: 75, category: 'Programming' },
  { name: 'OOPs', percentage: 80, category: 'Programming' },
  { name: 'HTML', percentage: 90, category: 'Web Development' },
  { name: 'CSS', percentage: 85, category: 'Web Development' },
  { name: 'SQL', percentage: 80, category: 'Database' },
  { name: 'RDBMS', percentage: 75, category: 'Database' },
  { name: 'Linux', percentage: 70, category: 'Tools' },
  { name: 'Networking', percentage: 75, category: 'Tools' },
];

const categories = ['All', 'Programming', 'Web Development', 'Database', 'Tools'];

// Circular Progress Component
const CircularProgress = ({ 
  percentage, 
  name, 
  delay 
}: { 
  percentage: number; 
  name: string; 
  delay: number;
}) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, delay * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  const getColor = (pct: number) => {
    if (pct >= 90) return '#10b981'; // green
    if (pct >= 80) return '#6366f1'; // indigo
    if (pct >= 70) return '#a855f7'; // purple
    return '#ec4899'; // pink
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-28 h-28">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/20"
          />
          {/* Progress circle */}
          <motion.circle
            cx="56"
            cy="56"
            r="45"
            fill="none"
            stroke={getColor(percentage)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: delay * 0.1 }}
            style={{
              filter: `drop-shadow(0 0 10px ${getColor(percentage)}40)`,
            }}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + delay * 0.1 }}
          >
            {progress}%
          </motion.span>
        </div>
      </div>
      
      {/* Skill name */}
      <motion.span
        className="mt-3 text-sm font-medium text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 + delay * 0.1 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

// Linear Progress Component for mobile
const LinearProgress = ({ 
  percentage, 
  name, 
  delay 
}: { 
  percentage: number; 
  name: string; 
  delay: number;
}) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, delay * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  const getColor = (pct: number) => {
    if (pct >= 90) return 'from-emerald-500 to-emerald-400';
    if (pct >= 80) return 'from-indigo-500 to-indigo-400';
    if (pct >= 70) return 'from-purple-500 to-purple-400';
    return 'from-pink-500 to-pink-400';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getColor(percentage)}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: delay * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
          >
            Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of technical skills developed through academic learning, 
            personal projects, and professional training.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-primary/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Desktop (Circular) */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {filteredSkills.map((skill, index) => (
            <CircularProgress
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              delay={index}
            />
          ))}
        </div>

        {/* Skills List - Mobile (Linear) */}
        <div className="md:hidden mb-12">
          {filteredSkills.map((skill, index) => (
            <LinearProgress
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              delay={index}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Programming Languages',
              items: ['C', 'C++', 'SQL', 'HTML/CSS'],
              color: 'from-indigo-500 to-blue-500',
            },
            {
              title: 'Concepts & Skills',
              items: ['Data Structures', 'OOPs', 'Networking', 'System Design'],
              color: 'from-purple-500 to-pink-500',
            },
            {
              title: 'Tools & Platforms',
              items: ['Linux', 'Git', 'Cisco Packet Tracer', 'VS Code'],
              color: 'from-pink-500 to-rose-500',
            },
          ].map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className={`text-lg font-bold mb-4 bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
