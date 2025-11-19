const Gemstone = require('../models/Gemstone.js');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'gemstones' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// Export multer upload middleware
module.exports.upload = upload;

// Get all gemstones
module.exports.getAllGemstones = async function(req, res) {
  try {
    const gemstones = await Gemstone.find();
    res.json(gemstones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gemstone
module.exports.getGemstoneById = async function(req, res) {
  try {
    const gemstone = await Gemstone.findById(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }
    res.json(gemstone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create gemstone
module.exports.createGemstone = async function(req, res) {
  try {
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const gemstoneData = {
      ...req.body,
      image: imageUrl
    };

    const gemstone = new Gemstone(gemstoneData);
    const newGemstone = await gemstone.save();
    res.status(201).json(newGemstone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update gemstone
module.exports.updateGemstone = async function(req, res) {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      updateData.image = imageUrl;
    }

    const gemstone = await Gemstone.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }
    res.json(gemstone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete gemstone
module.exports.deleteGemstone = async function(req, res) {
  try {
    const gemstone = await Gemstone.findByIdAndDelete(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }
    res.json({ message: 'Gemstone deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};