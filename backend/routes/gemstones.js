import express from 'express';
const router = express.Router();
import gemstoneController, { upload } from '../controllers/gemstoneController.js';
import { authenticateAdmin } from '../middleware/auth.js';

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

export default router;