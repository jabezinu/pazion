require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const gemstonesRouter = require('./routes/gemstones');
const coursesRouter = require('./routes/courses');
const equipmentsRouter = require('./routes/equipments');
const contactMessagesRouter = require('./routes/contactMessages');
const commentsRouter = require('./routes/comments');
const videosRouter = require('./routes/videos');
const authRouter = require('./routes/auth');
const cloudinary = require('cloudinary').v2;
const errorHandler = require('./middleware/errorHandler');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet()); // Security headers
app.use(limiter); // General rate limiting
app.use('/api/auth', authLimiter); // Stricter rate limiting for auth
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase payload limit for file uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Disable caching for all API responses
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/gemstones', gemstonesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/equipments', equipmentsRouter);
app.use('/api/contact-messages', contactMessagesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/videos', videosRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});