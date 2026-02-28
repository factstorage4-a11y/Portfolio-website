import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  techStack: {
    type: [String],
    required: [true, 'Please provide tech stack'],
  },
  githubLink: {
    type: String,
    required: [true, 'Please provide GitHub link'],
  },
  liveLink: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
