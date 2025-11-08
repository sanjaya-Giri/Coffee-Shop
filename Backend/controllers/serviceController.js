import Service from "../models/Service.js";

// ✅ Get all services (Public)
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// ✅ Get single service by ID (Public)
export const getSingleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// ✅ Add new service (Admin only)
export const createService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : "";

    if (!name || !description || !price)
      return res.status(400).json({ message: "All fields are required" });

    const newService = new Service({
      name,
      description,
      price,
      image,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully", newService });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error });
  }
};

// ✅ Update service (Admin only)
export const updateService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedData = { name, description, price };
    if (image) updatedData.image = image;

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service updated successfully", updatedService });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
};

// ✅ Delete service (Admin only)
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
};
