import Equipment from '../models/Equipment.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'equipments' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// Export multer upload middleware
export { upload };

// Get all equipments
export async function getAllEquipments(req, res) {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single equipment
export async function getEquipmentById(req, res) {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create equipment
export async function createEquipment(req, res) {
  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const equipmentData = {
      ...req.body,
      image: imageUrl
    };

    const equipment = new Equipment(equipmentData);
    const newEquipment = await equipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update equipment
export async function updateEquipment(req, res) {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      updateData.image = imageUrl;
    }

    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete equipment
export async function deleteEquipment(req, res) {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};