import mongoose from 'mongoose';

const MemorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  comments: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true,
});

export const Memory = mongoose.models.Memory || mongoose.model('Memory', MemorySchema); 