import express from 'express';
import { 
  createBlog, 
  getBlogs, 
  getBlog, 
  updateBlog, 
  deleteBlog 
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected admin routes
router.post('/', protect, upload.single('image'), createBlog);
router.put('/:id', protect, upload.single('image'), updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;