const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userModel = require("../Backend/models/userModel");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: hashedPassword });

    return res.status(201).json("Registered Successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and Password are required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json("Password is incorrect");
    }

    return res.status(200).json("Login successful");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("Something went wrong");
  }
});

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/user", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

connectDB();

// Start the Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
