const express = require('express');
const router = express.Router();
const gemstoneController = require('../controllers/gemstoneController.js');
const { upload } = require('../controllers/gemstoneController.js');

// GET /api/gemstones - Get all gemstones
router.get('/', gemstoneController.getAllGemstones);

// GET /api/gemstones/:id - Get single gemstone
router.get('/:id', gemstoneController.getGemstoneById);

// POST /api/gemstones - Create new gemstone
router.post('/', upload.single('image'), gemstoneController.createGemstone);

// PUT /api/gemstones/:id - Update gemstone
router.put('/:id', upload.single('image'), gemstoneController.updateGemstone);

// DELETE /api/gemstones/:id - Delete gemstone
router.delete('/:id', gemstoneController.deleteGemstone);

module.exports = router;