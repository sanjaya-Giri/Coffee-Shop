import express from "express";
import {
  createService,
  getAllServices,
  getSingleService,
  deleteService,
} from "../controllers/serviceController.js";
import { verifyMiddleware } from "../middleware/verifyMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js"; // ✅ correct import

const router = express.Router();

// ADD SERVICE (protected)
router.post("/add", verifyMiddleware, upload.single("image"), createService);

// GET all services
router.get("/", getAllServices);

// GET single service
router.get("/:id", getSingleService);

// DELETE service (protected)
router.delete("/:id", verifyMiddleware, deleteService);

export default router;
