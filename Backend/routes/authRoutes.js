import express from 'express';
import { 
  adminSignup, 
  adminLogin, 
  adminLogout,
  checkAdminExists,
  forceLogoutAll 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/check-admin', checkAdminExists);
router.post('/signup', adminSignup);
router.post('/login', adminLogin);

// Protected routes
router.post('/logout', protect, adminLogout);
router.post('/force-logout-all', forceLogoutAll); // Emergency reset
router.get('/verify', protect, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email
    }
  });
});

export default router;