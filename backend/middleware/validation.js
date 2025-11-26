// Validation middleware
const validateGemstone = (req, res, next) => {
  const { nameKey, category, quality, hardness } = req.body;

  const errors = [];

  if (!nameKey || typeof nameKey !== 'string' || nameKey.trim().length === 0) {
    errors.push('Name key is required and must be a non-empty string');
  }

  const validCategories = ['precious', 'semi-precious', 'organic'];
  if (!category || !validCategories.includes(category)) {
    errors.push('Category must be one of: precious, semi-precious, organic');
  }

  const validQualities = ['affordable', 'commercial', 'luxury'];
  if (!quality || !validQualities.includes(quality)) {
    errors.push('Quality must be one of: affordable, commercial, luxury');
  }

  if (!hardness || typeof hardness !== 'string' || hardness.trim().length === 0) {
    errors.push('Hardness is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateCourse = (req, res, next) => {
  const { name, duration, price, level, description } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!duration || typeof duration !== 'string' || duration.trim().length === 0) {
    errors.push('Duration is required and must be a non-empty string');
  }

  if (!price || typeof price !== 'string' || price.trim().length === 0) {
    errors.push('Price is required and must be a non-empty string');
  }

  if (!level || typeof level !== 'string' || level.trim().length === 0) {
    errors.push('Level is required and must be a non-empty string');
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateEquipment = (req, res, next) => {
  const { name, price, description } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!price || typeof price !== 'string' || price.trim().length === 0) {
    errors.push('Price is required and must be a non-empty string');
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateVideo = (req, res, next) => {
  const { title, url, description } = req.body;

  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    errors.push('URL is required and must be a non-empty string');
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    errors.push('URL must be a valid URL format');
  }

  if (description && typeof description !== 'string') {
    errors.push('Description must be a string if provided');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateContactMessage = (req, res, next) => {
  const { name, email, message } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Message is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateGemstone,
  validateCourse,
  validateEquipment,
  validateVideo,
  validateContactMessage
};