import bcrypt from 'bcryptjs';
import User from './models/userModel.js';

const seedUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'testuser@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Str0ngP@ssw0rd!', 10);

    const user = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedPassword,
      isAdmin: false,
    });

    await user.save();
    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

seedUser();
