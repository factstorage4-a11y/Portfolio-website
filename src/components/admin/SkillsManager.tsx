import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Sample skills - replace with API data
const sampleSkills = [
  { _id: '1', name: 'C', percentage: 85, category: 'Programming' },
  { _id: '2', name: 'C++', percentage: 80, category: 'Programming' },
  { _id: '3', name: 'DSA', percentage: 75, category: 'Programming' },
  { _id: '4', name: 'OOPs', percentage: 80, category: 'Programming' },
  { _id: '5', name: 'HTML', percentage: 90, category: 'Web Development' },
  { _id: '6', name: 'CSS', percentage: 85, category: 'Web Development' },
  { _id: '7', name: 'SQL', percentage: 80, category: 'Database' },
  { _id: '8', name: 'RDBMS', percentage: 75, category: 'Database' },
  { _id: '9', name: 'Linux', percentage: 70, category: 'Tools' },
  { _id: '10', name: 'Networking', percentage: 75, category: 'Tools' },
];

const categories = ['Programming', 'Web Development', 'Database', 'Tools', 'Other'];

interface Skill {
  _id: string;
  name: string;
  percentage: number;
  category: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>(sampleSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    percentage: 50,
    category: 'Programming',
  });

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        percentage: skill.percentage,
        category: skill.category,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: '',
        percentage: 50,
        category: 'Programming',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSkill) {
      setSkills(skills.map(s =>
        s._id === editingSkill._id
          ? { ...s, ...formData }
          : s
      ));
      toast.success('Skill updated successfully!');
    } else {
      const newSkill: Skill = {
        _id: Date.now().toString(),
        ...formData,
      };
      setSkills([...skills, newSkill]);
      toast.success('Skill added successfully!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(s => s._id !== id));
      toast.success('Skill deleted successfully!');
    }
  };

  const getColorByPercentage = (percentage: number) => {
    if (percentage >= 90) return 'from-emerald-500 to-emerald-400';
    if (percentage >= 80) return 'from-indigo-500 to-indigo-400';
    if (percentage >= 70) return 'from-purple-500 to-purple-400';
    return 'from-pink-500 to-pink-400';
  };

  // Group skills by category
  const groupedSkills = categories.map(category => ({
    category,
    skills: skills.filter(s => s.category === category),
  })).filter(g => g.skills.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">Manage your technical skills</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {groupedSkills.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {group.category}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.skills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-4 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.percentage}%
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${getColorByPercentage(skill.percentage)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenModal(skill)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(skill._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Skills Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-2xl font-bold text-gradient">{skills.length}</p>
            <p className="text-sm text-muted-foreground">Total Skills</p>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-2xl font-bold text-gradient">
              {Math.round(skills.reduce((acc, s) => acc + s.percentage, 0) / skills.length)}%
            </p>
            <p className="text-sm text-muted-foreground">Average Level</p>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-2xl font-bold text-gradient">
              {skills.filter(s => s.percentage >= 80).length}
            </p>
            <p className="text-sm text-muted-foreground">Expert Level</p>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-2xl font-bold text-gradient">
              {new Set(skills.map(s => s.category)).size}
            </p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., React, Python"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentage">
                Proficiency: {formData.percentage}%
              </Label>
              <input
                type="range"
                id="percentage"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                {editingSkill ? 'Update Skill' : 'Add Skill'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
