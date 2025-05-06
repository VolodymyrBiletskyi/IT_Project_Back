const express = require("express");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
const sendgrid = require ("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/User");
const Pet = require("../models/Pet");
const authenticateToken = require("../middleware/authMiddleware");
const { deleteUser } = require("../controllers/userController");
const req = require("express/lib/request");
const mailer = require("../controllers/mailer");
const { requestPasswordReset, resetPassword, requestAccountDeletion, confirmAccountDeletion } = require("../controllers/authController");
require("dotenv").config();
const router = express.Router();
const Specialist = require("../models/Specialist");

// Protected route example
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

    let isMatch = false;
    if (userType === "specialist") {
      isMatch = await bcrypt.compare(password, userOrSpecialist.password);
    } else {
      isMatch = await userOrSpecialist.comparePassword(password);
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token based on user type
    const tokenPayload = {
      id: userOrSpecialist.id,
      email: userOrSpecialist.email,
      role: userOrSpecialist.role, // Now this will be 'specialist' for specialists
    };

    // Force the role to 'specialist' if the userType is specialist
    if (userType === 'specialist') {

      tokenPayload.role = 'doctor';

    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userType });
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

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      id: uuidv4(),
      name,
      email,
      phone,
      password,
      role,
    });

    if (role === "owner") {
      console.log("Creating pet record...");
      console.log("Pet model:", Pet);

      await Pet.create({
        id: uuidv4(),
        owner_id: newUser.id,  // Use the new user's ID as the owner_id
        name: petName,
        species: species,
        breed: breed,
      });


      console.log("Pet record created.");
    }

    mailer.sendMail({
      to: newUser.email,
      subject: "Welcome to the PawCare?",
      html: "<h1> Your account was created successfully </h1>"
    }).then ((response) => {
      console.log("Email sent");
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.put("/edit", authenticateToken, async (req, res) => {
  const { name, email, phone, password, role, petName, species, breed, age, gender, weight } = req.body;
  const userId = req.user.id; // Get user ID from token

  console.log("Update profile request for user:", userId);

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
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

    // If the user is an owner, update their pet's details
    if (user.role === "owner") {
      const pet = await Pet.findOne({ where: { owner_id: userId } });

      if (pet) {
        // Update pet fields if provided
        if (petName) pet.name = petName;
        if (species) pet.species = species;
        if (breed) pet.breed = breed;
        if (age) pet.age = age;
        if (gender) pet.gender = gender;
        if (weight) pet.weight = weight;

        // Save updated pet
        await pet.save();
        console.log("Pet details updated successfully:", pet);
      } else {
        console.log("No pet found for this owner.");
      }
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/reset-password-request",requestPasswordReset);
router.post("/reset-password",resetPassword);
router.post("/request-account-deletion", requestAccountDeletion);
router.delete("/confirm-account-deletion", confirmAccountDeletion);

module.exports = router;
