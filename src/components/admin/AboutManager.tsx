import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Briefcase, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Sample data - replace with API data
const initialData = {
  bio: 'Motivated and curious Computer Science student with a keen interest in programming, cybersecurity, and emerging technologies. Looking for opportunities to gain hands-on experience and grow under professional guidance.',
  education: [
    {
      id: '1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Bihar Engineering University, Patna',
      year: '2022 - 2026',
      description: 'Pursuing B.Tech with focus on AI, Data Structures, and Software Engineering.',
    },
    {
      id: '2',
      degree: 'Senior Secondary (Class 12)',
      institution: 'MSY College, BSEB',
      year: '2022',
      description: 'Completed senior secondary education with Science stream.',
    },
  ],
  experience: [
    {
      id: '1',
      role: 'CCNA Trainee',
      company: 'Edcreate Foundation & Cisco Networking Academy',
      duration: 'May 2025 - June 2025',
      description: 'Practical experience with Cisco Packet Tracer. Configured routing, switching (VLANs), and security.',
    },
  ],
};

export default function AboutManager() {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('About section updated successfully!');
    setIsSaving(false);
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          degree: '',
          institution: '',
          year: '',
          description: '',
        },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setData({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setData({
      ...data,
      education: data.education.filter(edu => edu.id !== id),
    });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          role: '',
          company: '',
          duration: '',
          description: '',
        },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setData({
      ...data,
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setData({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">About Section</h2>
          <p className="text-muted-foreground">Manage your bio, education, and experience</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Bio</h3>
        </div>
        <Textarea
          value={data.bio}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
          rows={4}
          className="resize-none"
          placeholder="Write a brief description about yourself..."
        />
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
          <Button size="sm" variant="outline" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg space-y-3"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="e.g., B.Tech in CSE"
                  />
                </div>
                <div>
                  <Label className="text-xs">Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="e.g., Bihar Engineering University"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Year</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    placeholder="e.g., 2022 - 2026"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Brief description..."
                  rows={2}
                  className="resize-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Experience</h3>
          </div>
          <Button size="sm" variant="outline" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg space-y-3"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Role</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    placeholder="e.g., Software Intern"
                  />
                </div>
                <div>
                  <Label className="text-xs">Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="e.g., Google"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Duration</Label>
                  <Input
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    placeholder="e.g., Jan 2024 - Present"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={2}
                  className="resize-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
