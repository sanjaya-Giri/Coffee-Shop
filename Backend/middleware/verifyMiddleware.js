import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const verifyMiddleware = async (req, res, next) => {
  try {
    // Check token from cookies or header
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin by ID
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: "Invalid admin credentials" });
    }

    // Attach admin to request
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};
