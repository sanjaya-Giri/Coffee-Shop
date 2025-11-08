import asyncHandler from "express-async-handler";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new admin
// @route   POST /api/admin/signup
// @access  Public (only for first admin)
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if admin already exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // Create new admin
  const admin = await Admin.create({ name, email, password });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Login admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("-password");

  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
