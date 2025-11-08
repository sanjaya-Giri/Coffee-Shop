import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile } from "../controllers/adminController.js";
import { verifyMiddleware } from "../middleware/verifyMiddleware.js";

const router = express.Router();

// Admin registration (only once or handled manually)
router.post("/register", registerAdmin);

// Admin login
router.post("/login", loginAdmin);

// Get admin profile (protected)
router.get("/profile", verifyMiddleware, getAdminProfile);

export default router;
