import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: [true, 'Please provide a skill name'],
  },
  percentage: {
    type: Number,
    required: [true, 'Please provide percentage'],
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    enum: ['Programming', 'Web Development', 'Database', 'Tools', 'Other'],
    default: 'Other',
  },
  icon: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
