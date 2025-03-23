const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/User");
const Pet = require("../models/Pet");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route example
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("login request received:", { email, password });

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
  const { name, email, password, role, petName, species, breed } = req.body;

  if (!name || !email || !password || !role) {
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

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.put("/edit", authenticateToken, async (req, res) => {
  const { name, email, password, role, petName, species, breed, age } = req.body;
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


module.exports = router;
