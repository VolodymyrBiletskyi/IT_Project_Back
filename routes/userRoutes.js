const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Pet = require('../models/Pet');
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/pets', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all pets owned by the user
    const pets = await Pet.findAll({
      where: { owner_id: userId },
      attributes: ['id', 'name', 'species', 'breed', 'age', 'weight', 'gender'],
    });

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found for this user" });
    }

    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
