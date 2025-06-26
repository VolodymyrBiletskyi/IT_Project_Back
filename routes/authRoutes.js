// routes/authRoutes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
require("dotenv").config();

const router = express.Router();

const User = require("../models/User");
const Pet = require("../models/Pet");
const Specialist = require("../models/Specialist");
const authenticateToken = require("../middleware/authMiddleware");
const mailer = require("../controllers/mailer");

// --- Routes ---

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    let userOrSpecialist = await User.findOne({ where: { email } });
    let userType = "user";

    if (!userOrSpecialist) {
      userOrSpecialist = await Specialist.findOne({ where: { email } });
      userType = "specialist";
    }

    if (!userOrSpecialist) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userOrSpecialist.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokenPayload = {
      id: userOrSpecialist.id,
      email: userOrSpecialist.email,
      role: userType === 'specialist' ? 'doctor' : userOrSpecialist.role === 'receptionist' ? 'admin' : userOrSpecialist.role
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userType: tokenPayload.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, role, petName, species, breed } = req.body;

  if (!name || !email || !password || !role || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role === "owner" && (!petName || !species || !breed)) {
    return res.status(400).json({ message: "Pet details are required for owners" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ id: uuidv4(), name, email, phone, password, role });

    if (role === "owner") {
      await Pet.create({ id: uuidv4(), owner_id: newUser.id, name: petName, species, breed });
    }

    await mailer.sendMail({
      to: newUser.email,
      subject: "Welcome to PawCare",
      html: "<h1>Your account was created successfully</h1>"
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/edit", authenticateToken, async (req, res) => {
  const { name, email, phone, password, role, petName, species, breed, age, gender, weight } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role && ["admin", "doctor", "receptionist", "owner"].includes(role)) user.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save();

    if (user.role === "owner") {
      const pet = await Pet.findOne({ where: { owner_id: userId } });
      if (pet) {
        if (petName) pet.name = petName;
        if (species) pet.species = species;
        if (breed) pet.breed = breed;
        if (age) pet.age = age;
        if (gender) pet.gender = gender;
        if (weight) pet.weight = weight;
        await pet.save();
      }
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/reset-password-request", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    await mailer.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetUrl}`,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete-account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Pet.destroy({ where: { owner_id: user.id } });
    await user.destroy();

    res.json({ message: "Account and associated pets deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let user;
    if (role === "doctor" || role === "specialist") {
      user = await Specialist.findByPk(userId, {
        attributes: ['id', 'name', 'email']
      });
    } else {
      user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'phone']
      });
    }

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;