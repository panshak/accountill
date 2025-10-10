import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Models
const userSchema = new mongoose.Schema({ name: String });
const invoiceSchema = new mongoose.Schema({ total: Number });
const customerSchema = new mongoose.Schema({ name: String });

const User = mongoose.model("User", userSchema);
const Invoice = mongoose.model("Invoice", invoiceSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Routes for counts
app.get("/api/users/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user count" });
  }
});

app.get("/api/invoices/count", async (req, res) => {
  try {
    const count = await Invoice.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch invoice count" });
  }
});

app.get("/api/customers/count", async (req, res) => {
  try {
    const count = await Customer.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customer count" });
  }
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected"); // ✅ Now you will see this log
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
