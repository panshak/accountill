// createDemoUser.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const MONGO_URI = process.env.DB_URL;

if (!MONGO_URI) {
  console.error("❌ Error: DB_URL not found in .env file");
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Create demo user
const createDemoUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: "demo@example.com" });
    if (existingUser) {
      console.log("⚠️ Demo user already exists!");
      mongoose.connection.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("demo123", 10);

    // Create user matching the schema
    const demoUser = new User({
      name: "Demo User",          // required field in schema
      email: "demo@example.com",  // required and unique
      password: hashedPassword,   // required
    });

    await demoUser.save();
    console.log("✅ Demo user created successfully!");
  } catch (err) {
    console.error("❌ Error creating demo user:", err);
  } finally {
    mongoose.connection.close();
  }
};

createDemoUser();

