import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  currentToken: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to logout all admins
adminSchema.statics.logoutAll = async function() {
  await this.updateMany({}, { 
    isLoggedIn: false, 
    currentToken: null 
  });
};

export default mongoose.model('Admin', adminSchema);