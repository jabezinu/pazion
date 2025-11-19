const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage.js');

// GET /api/comments - Get all comments marked for display on home
router.get('/', async (req, res) => {
  try {
    const comments = await ContactMessage.find({ displayOnHome: true }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;