# KalGemstone Backend API

A comprehensive REST API for the KalGemstone application, built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based admin authentication
- **File Upload**: Cloudinary integration for image uploads
- **Data Management**: CRUD operations for gemstones, courses, equipment, videos, and contact messages
- **Security**: Rate limiting, CORS, helmet security headers, input validation
- **Error Handling**: Centralized error handling with detailed responses
- **Environment Configuration**: Secure environment variable management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Custom middleware validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account for image storage

### Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. Seed the admin user:
   ```bash
   npm run seed:admin
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/change-password` - Change admin password

### Gemstones
- `GET /api/gemstones` - Get all gemstones
- `GET /api/gemstones/:id` - Get single gemstone
- `POST /api/gemstones` - Create gemstone (Admin only)
- `PUT /api/gemstones/:id` - Update gemstone (Admin only)
- `DELETE /api/gemstones/:id` - Delete gemstone (Admin only)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Equipment
- `GET /api/equipments` - Get all equipment
- `GET /api/equipments/:id` - Get single equipment
- `POST /api/equipments` - Create equipment (Admin only)
- `PUT /api/equipments/:id` - Update equipment (Admin only)
- `DELETE /api/equipments/:id` - Delete equipment (Admin only)

### Videos
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create video (Admin only)
- `PUT /api/videos/:id` - Update video (Admin only)
- `DELETE /api/videos/:id` - Delete video (Admin only)

### Contact Messages
- `GET /api/contact-messages` - Get all contact messages (Admin only)
- `GET /api/contact-messages/:id` - Get single contact message (Admin only)
- `POST /api/contact-messages` - Create contact message (Public)
- `PUT /api/contact-messages/:id` - Update contact message (Admin only)
- `DELETE /api/contact-messages/:id` - Delete contact message (Admin only)

## Data Models

### Admin
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Gemstone
```javascript
{
  nameKey: String (required),
  category: String (required, enum: ['precious', 'semi-precious', 'organic']),
  quality: String (required, enum: ['affordable', 'commercial', 'luxury']),
  hardness: String (required),
  image: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Course
```javascript
{
  name: String (required),
  duration: String (required),
  price: String (required),
  level: String (required),
  description: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Equipment
```javascript
{
  name: String (required),
  price: String (required),
  description: String (required),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Video
```javascript
{
  title: String (required),
  url: String (required),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Message
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  location: String,
  rating: Number (default: 5),
  read: Boolean (default: false),
  displayOnHome: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes for general routes, 5 requests per 15 minutes for auth routes
- **CORS**: Configured for specific origins
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation middleware
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security

## Error Handling

The API provides consistent error responses:

```json
{
  "message": "Error description",
  "errors": ["Detailed error messages"] // For validation errors
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run seed:admin` - Create default admin user
- `npm test` - Run tests (when implemented)

### Project Structure

```
backend/
├── controllers/          # Route controllers
├── middleware/           # Custom middleware
├── models/              # Mongoose models
├── routes/              # API routes
├── utils/               # Utility functions
├── .env                 # Environment variables
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── package.json         # Dependencies and scripts
├── README.md           # This file
└── server.js           # Application entry point
```

## Deployment

1. Set environment variables for production
2. Update CORS origins for your frontend domain
3. Ensure MongoDB connection string is for production database
4. Run `npm run seed:admin` to create admin user
5. Start the server with `npm start`

## Contributing

1. Follow the existing code style and structure
2. Add validation for new endpoints
3. Update documentation for API changes
4. Test thoroughly before committing

## License

This project is licensed under the ISC License.