import express from 'express';
const router = express.Router();
import * as equipmentController from '../controllers/equipmentController.js';
import { upload } from '../controllers/equipmentController.js';

// GET /api/equipments - Get all equipments
router.get('/', equipmentController.getAllEquipments);

// GET /api/equipments/:id - Get single equipment
router.get('/:id', equipmentController.getEquipmentById);

// POST /api/equipments - Create new equipment
router.post('/', upload.single('image'), equipmentController.createEquipment);

// PUT /api/equipments/:id - Update equipment
router.put('/:id', upload.single('image'), equipmentController.updateEquipment);

// DELETE /api/equipments/:id - Delete equipment
router.delete('/:id', equipmentController.deleteEquipment);

export default router;