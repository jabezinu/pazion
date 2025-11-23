const express = require('express');
const router = express.Router();
const gemstoneController = require('../controllers/gemstoneController');
const { upload } = gemstoneController;
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/gemstones - Get all gemstones (public)
router.get('/', gemstoneController.getAllGemstones);

// GET /api/gemstones/:id - Get single gemstone (public)
router.get('/:id', gemstoneController.getGemstoneById);

// POST /api/gemstones - Create new gemstone (protected)
router.post('/', authenticateAdmin, upload.single('image'), gemstoneController.createGemstone);

// PUT /api/gemstones/:id - Update gemstone (protected)
router.put('/:id', authenticateAdmin, upload.single('image'), gemstoneController.updateGemstone);

// DELETE /api/gemstones/:id - Delete gemstone (protected)
router.delete('/:id', authenticateAdmin, gemstoneController.deleteGemstone);

module.exports = router;