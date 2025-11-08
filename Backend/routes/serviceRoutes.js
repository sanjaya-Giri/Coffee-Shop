import express from "express";
import {
  createService,
  getAllServices,
  getSingleService,
  deleteService,
  updateService,
} from "../controllers/serviceController.js";
import { verifyMiddleware } from "../middleware/verifyMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Add new service (admin only)
router.post("/create", verifyMiddleware, upload.single("image"), createService);

// Get all services (public)
router.get("/", getAllServices);

// Get single service (public)
router.get("/:id", getSingleService);

// Update service (admin only)
router.put("/:id", verifyMiddleware, upload.single("image"), updateService);

// Delete service (admin only)
router.delete("/:id", verifyMiddleware, deleteService);

export default router;
