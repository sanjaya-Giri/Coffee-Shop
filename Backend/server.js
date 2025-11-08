import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cookieParser());

// Middleware
app.use(express.json()); // to parse JSON request body
app.use(cors()); // allow frontend connection

// Routes
app.use("/api/admin", adminRoutes);      // Admin login/signup routes
app.use("/api/blogs", blogRoutes);       // Blog routes (public + admin protected)
app.use("/api/services", serviceRoutes); // Services routes (public + admin protected)


app.use(notFound);
app.use(errorHandler);
// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Coffee Shop API ☕");
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
