import mongoose from 'mongoose';
import 'dotenv/config';
import Admin from './models/Admin.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'kalgem' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      username: 'kalgem',
      password: '0987654321'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Username: kalgem');
    console.log('Password: 0987654321');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
