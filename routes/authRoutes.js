const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");  // Import bcrypt
const User = require("../models/User");  // Ensure this is the correct import path
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route example
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("login request received:", {email, password});

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("Stored hashed password in DB:", user.password);
    console.log("Entered password:", password);

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log("Password does not match for user:", user.email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("Password matches for user:", user.email);

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("JWT token generated for user:", user.email);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Received registration request:", { name, email, password, role });

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validRoles = ["admin", "doctor", "receptionist", "owner"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role. Must be one of: admin, doctor, receptionist, owner" });
  }

  try {
    console.log("Checking if email already exists...");
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log("Email already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    // console.log("Hashing password...");
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Creating user...");
    const newUser = await User.create({ name, email, password, role });

    console.log("User created successfully:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/edit", authenticateToken, async (req, res) => {
  const { name, email, password, role } = req.body;
  const userId = req.user.id; // Get user ID from token

  console.log("Update profile request for user:", userId);

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) {
      const validRoles = ["admin", "doctor", "receptionist", "owner"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role provided" });
      }
      user.role = role;
    }

    // Handle password change separately
    if (password) {
      console.log("Updating password...");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user
    await user.save();
    console.log("User profile updated successfully:", user);

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;