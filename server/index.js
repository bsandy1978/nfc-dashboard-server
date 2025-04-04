// Ensure proper DNS resolution (sometimes helps on Windows)
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import UserProfile from './models/UserProfile.js';

// Load environment variables from the .env file
dotenv.config();

// Debug: Log the environment variables to ensure .env is loaded
console.log("Using MONGO_URI:", process.env.MONGO_URI);
// Uncomment the following line if you want to see all loaded env variables:
// console.log("All env vars:", process.env);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log("Connecting to MongoDB:", process.env.MONGO_URI);

// Connect to MongoDB using the SRV URI from your .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Fail fast if MongoDB is unreachable
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));

// API route: Create a new user profile
app.post('/api/profiles', async (req, res) => {
  console.log("🔥 POST /api/profiles hit");
  try {
    const profile = new UserProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error("❌ Error saving profile:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// API route: Get user profile by username
app.get('/u/:username', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ username: req.params.username });
    if (!profile) return res.status(404).send("User not found");
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root route for quick testing
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
