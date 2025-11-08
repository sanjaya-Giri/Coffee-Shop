import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// ✅ Middleware to verify JWT and attach user/admin to request
export const authMiddleware = async (req, res, next) => {
  try {
    // Check if token exists (either in cookies or Authorization header)
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided. Access denied." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin by decoded id
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(403).json({ message: "Invalid credentials. Admin not found." });
    }

    // Attach admin info to request for later use
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};
