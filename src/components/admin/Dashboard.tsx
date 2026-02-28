import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  Sparkles, 
  Eye, 
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';

// Mock stats - replace with real data from API
const mockStats = {
  totalProjects: 8,
  totalSkills: 10,
  totalViews: 1250,
  growthRate: '+15%',
};

const recentActivity = [
  { action: 'Added new project', item: 'Portfolio Website', time: '2 hours ago' },
  { action: 'Updated skill', item: 'React', time: '1 day ago' },
  { action: 'Added new project', item: 'Network Implementation', time: '3 days ago' },
  { action: 'Updated about section', item: 'Bio', time: '1 week ago' },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const statCards = [
    { 
      label: 'Total Projects', 
      value: mockStats.totalProjects, 
      icon: FolderGit2,
      color: 'from-indigo-500 to-blue-500',
      trend: '+2 this month'
    },
    { 
      label: 'Total Skills', 
      value: mockStats.totalSkills, 
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      trend: '+3 this month'
    },
    { 
      label: 'Profile Views', 
      value: mockStats.totalViews, 
      icon: Eye,
      color: 'from-pink-500 to-rose-500',
      trend: mockStats.growthRate
    },
    { 
      label: 'Growth Rate', 
      value: mockStats.growthRate, 
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      trend: 'vs last month'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Ved! 👋</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your portfolio
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          <Clock className="w-4 h-4 ml-2" />
          {currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid gap-3">
            {[
              { label: 'Add New Project', href: '#projects', color: 'from-indigo-500 to-blue-500' },
              { label: 'Update Skills', href: '#skills', color: 'from-purple-500 to-pink-500' },
              { label: 'Edit About Section', href: '#about', color: 'from-pink-500 to-rose-500' },
              { label: 'View Portfolio', href: '/', color: 'from-emerald-500 to-teal-500' },
            ].map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`flex items-center justify-between p-4 rounded-lg bg-gradient-to-r ${action.color} bg-opacity-10 hover:bg-opacity-20 transition-all group`}
              >
                <span className="font-medium">{action.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-xl p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
      >
        <h3 className="text-lg font-semibold mb-2">💡 Pro Tip</h3>
        <p className="text-muted-foreground">
          Keep your portfolio updated with your latest projects and skills. 
          Regular updates help showcase your growth and attract more opportunities.
        </p>
      </motion.div>
    </div>
  );
}
