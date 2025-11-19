const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController.js');
const { upload } = require('../controllers/courseController.js');

// GET /api/courses - Get all courses
router.get('/', courseController.getAllCourses);

// GET /api/courses/:id - Get single course
router.get('/:id', courseController.getCourseById);

// POST /api/courses - Create new course
router.post('/', upload.single('image'), courseController.createCourse);

// PUT /api/courses/:id - Update course
router.put('/:id', upload.single('image'), courseController.updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;