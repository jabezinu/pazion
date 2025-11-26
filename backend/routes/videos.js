const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateVideo } = require('../middleware/validation');

// GET /api/videos - Get all videos (public)
router.get('/', videoController.getAllVideos);

// GET /api/videos/:id - Get single video (public)
router.get('/:id', videoController.getVideoById);

// POST /api/videos - Create new video (protected)
router.post('/', authenticateAdmin, validateVideo, videoController.createVideo);

// PUT /api/videos/:id - Update video (protected)
router.put('/:id', authenticateAdmin, validateVideo, videoController.updateVideo);

// DELETE /api/videos/:id - Delete video (protected)
router.delete('/:id', authenticateAdmin, videoController.deleteVideo);

module.exports = router;