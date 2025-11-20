import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: 300
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Admin'
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['coffee', 'recipes', 'news', 'tips', 'stories'],
    default: 'coffee'
  },
  published: {
    type: Boolean,
    default: true
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  slug: {
    type: String,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

// Generate slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

// Index for better query performance
blogSchema.index({ category: 1, published: 1, createdAt: -1 });
blogSchema.index({ slug: 1 });

export default mongoose.model('Blog', blogSchema);