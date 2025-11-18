import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
