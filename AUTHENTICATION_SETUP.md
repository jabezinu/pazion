# Admin Authentication Setup

## Overview
The admin panel now has a secure login system with the following features:
- Login page with username/password authentication
- JWT-based session management
- Protected routes (requires authentication)
- Change password functionality
- Logout functionality

## Setup Instructions

### 1. Seed the Admin User
Run the following command in the `backend` directory to create the default admin user:

```bash
cd backend
npm run seed:admin
```

### 2. Default Credentials
- **Username**: `kalgem`
- **Password**: `0987654321`

### 3. Start the Backend Server
```bash
cd backend
npm run dev
```

### 4. Start the Admin Frontend
```bash
cd admin
npm run dev
```

## Features

### Login Page
- Located at `/login`
- Requires username and password
- Shows error messages for invalid credentials
- Redirects to dashboard on successful login

### Protected Routes
- All admin routes require authentication
- Unauthenticated users are redirected to `/login`
- JWT token stored in localStorage

### Sidebar Actions
Two new buttons have been added to the bottom of the admin sidebar:
1. **Change Password** - Opens a modal to change the current password
2. **Logout** - Logs out and redirects to login page

### Change Password
- Requires current password verification
- New password must be at least 6 characters
- Confirms new password matches
- Shows success/error messages

## Security Features
- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- Protected API endpoints require valid JWT token
- Current password verification for password changes

## API Endpoints

### POST `/api/auth/login`
Login with username and password
```json
{
  "username": "kalgem",
  "password": "0987654321"
}
```

### GET `/api/auth/verify`
Verify JWT token (requires Authorization header)

### POST `/api/auth/change-password`
Change password (requires Authorization header)
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

## Files Created/Modified

### Backend
- `backend/models/Admin.js` - Admin user model with password hashing
- `backend/routes/auth.js` - Authentication routes
- `backend/middleware/auth.js` - JWT authentication middleware
- `backend/seedAdmin.js` - Script to seed default admin user
- `backend/server.js` - Added auth routes

### Frontend
- `admin/src/contexts/AuthContext.jsx` - Authentication context provider
- `admin/src/services/authService.js` - Authentication API service
- `admin/src/components/Login.jsx` - Login page component
- `admin/src/components/ProtectedRoute.jsx` - Route protection wrapper
- `admin/src/components/ChangePasswordModal.jsx` - Change password modal
- `admin/src/components/Layout.jsx` - Added logout and change password buttons
- `admin/src/App.jsx` - Updated with authentication routing

## Notes
- Make sure to set `JWT_SECRET` in your `.env` file for production
- The default JWT secret is `your-secret-key` (change this in production!)
- Tokens are stored in localStorage and persist across browser sessions
- The admin user collection is separate from other users
