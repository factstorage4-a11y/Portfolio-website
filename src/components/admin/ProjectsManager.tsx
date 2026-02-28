import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Github, 
  Image as ImageIcon,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Sample projects - replace with API data
const sampleProjects = [
  {
    _id: '1',
    title: 'Student Result Management System',
    description: 'A comprehensive CLI-based system using file handling for storing and retrieving student result records.',
    techStack: ['C++', 'File Handling', 'Data Structures'],
    githubLink: 'https://github.com/vedprakasharya',
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    featured: true,
  },
  {
    _id: '2',
    title: 'Company Network Implementation',
    description: 'Designed and implemented a complete small office network using Cisco Packet Tracer.',
    techStack: ['Cisco Packet Tracer', 'VLAN', 'Networking'],
    githubLink: 'https://github.com/vedprakasharya',
    liveLink: '',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    featured: true,
  },
];

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
  featured: boolean;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveLink: '',
    imageUrl: '',
    featured: false,
  });

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(', '),
        githubLink: project.githubLink,
        liveLink: project.liveLink,
        imageUrl: project.imageUrl,
        featured: project.featured,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        liveLink: '',
        imageUrl: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p._id === editingProject._id 
          ? { ...p, ...projectData }
          : p
      ));
      toast.success('Project updated successfully!');
    } else {
      // Add new project
      const newProject: Project = {
        _id: Date.now().toString(),
        ...projectData,
      };
      setProjects([...projects, newProject]);
      toast.success('Project added successfully!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p._id !== id));
      toast.success('Project deleted successfully!');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate Cloudinary upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In real implementation, upload to Cloudinary and get URL
    const mockUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, imageUrl: mockUrl }));
    
    setIsUploading(false);
    toast.success('Image uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl overflow-hidden group"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleOpenModal(project)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(project._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {project.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                  Featured
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold truncate">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-muted-foreground">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma separated) *</Label>
                <Input
                  id="techStack"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React, TypeScript, Node.js"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link *</Label>
                <Input
                  id="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liveLink">Live Link (optional)</Label>
                <Input
                  id="liveLink"
                  type="url"
                  value={formData.liveLink}
                  onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Project Image</Label>
              <div className="flex items-center gap-4">
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <ImageIcon className="w-4 h-4 mr-2" />
                    )}
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as featured project
              </Label>
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
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
