require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB using your URI in .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 2. Wipe the existing users to prevent duplicate errors
    await User.deleteMany();
    console.log('🧹 Cleared existing users from database');

    // 3. Create a real Admin User
    // (Note: Your User model automatically hashes the password before saving!)
    const admin = await User.create({
      name: 'Admin Manager',
      email: 'admin@litwits.com',
      password: 'AdminPassword123!',
      role: 'admin',
    });
    console.log(`👑 Admin created: ${admin.email}`);

    // 4. Create a normal Test User
    const user = await User.create({
      name: 'John Doe',
      email: 'user@litwits.com',
      password: 'UserPassword123!',
      role: 'user',
    });
    console.log(`👤 Normal User created: ${user.email}`);

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
