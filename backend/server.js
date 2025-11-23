const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gemstonesRouter = require('./routes/gemstones');
const coursesRouter = require('./routes/courses');
const equipmentsRouter = require('./routes/equipments');
const contactMessagesRouter = require('./routes/contactMessages');
const commentsRouter = require('./routes/comments');
const videosRouter = require('./routes/videos');
const authRouter = require('./routes/auth');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dri04iflq',
  api_key: '265833691256595',
  api_secret: '_o-_u9uliTngb2CTqkfJssP_mU4'
});

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

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
mongoose.connect('mongodb://taeemkurt:nQyQZVjUND3xDFZu@ac-znid8xu-shard-00-00.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-01.usti5w8.mongodb.net:27017,ac-znid8xu-shard-00-02.usti5w8.mongodb.net:27017/yab?ssl=true&replicaSet=atlas-8zhmwz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});