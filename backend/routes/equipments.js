import express from 'express';
const router = express.Router();
import equipmentController, { upload } from '../controllers/equipmentController.js';
import { authenticateAdmin } from '../middleware/auth.js';

// GET /api/equipments - Get all equipments (public)
router.get('/', equipmentController.getAllEquipments);

// GET /api/equipments/:id - Get single equipment (public)
router.get('/:id', equipmentController.getEquipmentById);

// POST /api/equipments - Create new equipment (protected)
router.post('/', authenticateAdmin, upload.single('image'), equipmentController.createEquipment);

// PUT /api/equipments/:id - Update equipment (protected)
router.put('/:id', authenticateAdmin, upload.single('image'), equipmentController.updateEquipment);

// DELETE /api/equipments/:id - Delete equipment (protected)
router.delete('/:id', authenticateAdmin, equipmentController.deleteEquipment);

export default router;