import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ✅ IMPORT ROUTES - Make sure these exist
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Create uploads folders
const createUploadsFolders = () => {
  const uploadsDir = path.join(__dirname, "uploads");
  const servicesDir = path.join(uploadsDir, "services");
  const blogsDir = path.join(uploadsDir, "blogs");

  [uploadsDir, servicesDir, blogsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Create upload folders
createUploadsFolders();

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ ROUTES - Make sure these are added
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "Server is running! 🚀",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "Coffee Shop API is running!",
    endpoints: {
      auth: "/api/auth",
      services: "/api/services", 
      blogs: "/api/blogs",
      health: "/api/health"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("🚨 Error:", error);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log("🔄 Connecting to database...");
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
});