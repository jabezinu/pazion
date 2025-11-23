import express from 'express';
const router = express.Router();
import contactMessageController from '../controllers/contactMessageController.js';
import { authenticateAdmin } from '../middleware/auth.js';

// GET /api/contact-messages - Get all contact messages (protected)
router.get('/', authenticateAdmin, contactMessageController.getAllContactMessages);

// GET /api/contact-messages/:id - Get single contact message (protected)
router.get('/:id', authenticateAdmin, contactMessageController.getContactMessageById);

// POST /api/contact-messages - Create new contact message (public - for client contact form)
router.post('/', contactMessageController.createContactMessage);

// PUT /api/contact-messages/:id - Update contact message (protected)
router.put('/:id', authenticateAdmin, contactMessageController.updateContactMessage);

// DELETE /api/contact-messages/:id - Delete contact message (protected)
router.delete('/:id', authenticateAdmin, contactMessageController.deleteContactMessage);

export default router;