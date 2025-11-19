const ContactMessage = require('../models/ContactMessage.js');

// Get all contact messages
module.exports.getAllContactMessages = async function(req, res) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact message
module.exports.getContactMessageById = async function(req, res) {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create contact message
module.exports.createContactMessage = async function(req, res) {
  try {
    const message = new ContactMessage(req.body);
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update contact message (mark as read)
module.exports.updateContactMessage = async function(req, res) {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contact message
module.exports.deleteContactMessage = async function(req, res) {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ message: 'Contact message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};