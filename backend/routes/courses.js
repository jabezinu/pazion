const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { upload } = courseController;
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/courses - Get all courses (public)
router.get('/', courseController.getAllCourses);

// GET /api/courses/:id - Get single course (public)
router.get('/:id', courseController.getCourseById);

// POST /api/courses - Create new course (protected)
router.post('/', authenticateAdmin, upload.single('image'), courseController.createCourse);

// PUT /api/courses/:id - Update course (protected)
router.put('/:id', authenticateAdmin, upload.single('image'), courseController.updateCourse);

// DELETE /api/courses/:id - Delete course (protected)
router.delete('/:id', authenticateAdmin, courseController.deleteCourse);

module.exports = router;