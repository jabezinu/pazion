import express from 'express';
const router = express.Router();
import * as courseController from '../controllers/courseController.js';
import { upload } from '../controllers/courseController.js';

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

export default router;