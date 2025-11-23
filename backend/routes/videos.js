import express from 'express';
const router = express.Router();
import videoController from '../controllers/videoController.js';
import { authenticateAdmin } from '../middleware/auth.js';

// GET /api/videos - Get all videos (public)
router.get('/', videoController.getAllVideos);

// GET /api/videos/:id - Get single video (public)
router.get('/:id', videoController.getVideoById);

// POST /api/videos - Create new video (protected)
router.post('/', authenticateAdmin, videoController.createVideo);

// PUT /api/videos/:id - Update video (protected)
router.put('/:id', authenticateAdmin, videoController.updateVideo);

// DELETE /api/videos/:id - Delete video (protected)
router.delete('/:id', authenticateAdmin, videoController.deleteVideo);

export default router;