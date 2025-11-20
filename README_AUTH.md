# 🔐 Admin Authentication System

## Quick Reference

### Default Login Credentials
```
Username: kalgem
Password: 0987654321
```

### Start the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Admin Frontend:**
```bash
cd admin
npm run dev
```

### New Features in Admin Panel

#### 1. Login Page (`/login`)
- Secure authentication with JWT
- Beautiful gradient design
- Error handling

#### 2. Sidebar Buttons (Bottom)
- **🔑 Change Password** - Update your password securely
- **🚪 Logout** - Sign out of the admin panel

#### 3. Protected Routes
- All admin pages require authentication
- Automatic redirect to login if not authenticated
- Session persists across browser refreshes

### API Endpoints

```
POST   /api/auth/login              - Login
GET    /api/auth/verify             - Verify token
POST   /api/auth/change-password    - Change password
```

### Seed Admin User

If you need to recreate the admin user:
```bash
cd backend
npm run seed:admin
```

### Security Notes

✅ Passwords are hashed with bcrypt  
✅ JWT tokens expire after 7 days  
✅ Protected API endpoints  
✅ Secure password verification  

---

**That's it!** Your admin panel is now secure and ready to use. 🎉
