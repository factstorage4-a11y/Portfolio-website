import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'About Me',
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  education: [{
    degree: String,
    institution: String,
    year: String,
    description: String,
  }],
  experience: [{
    role: String,
    company: String,
    duration: String,
    description: String,
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);
