import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { verifyMiddleware } from "../middleware/verifyMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create blog (admin only)
router.post("/create", verifyMiddleware, upload.single("image"), createBlog);

// Get all blogs (public)
router.get("/", getAllBlogs);

// Get single blog (public)
router.get("/:id", getSingleBlog);

// Update blog (admin only)
router.put("/:id", verifyMiddleware, upload.single("image"), updateBlog);

// Delete blog (admin only)
router.delete("/:id", verifyMiddleware, deleteBlog);

export default router;
