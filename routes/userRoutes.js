const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Pet = require('../models/Pet');
const Appointment = require('../models/Appointment');
const Specialist = require('../models/Specialist');
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

async function authorizePetOwner(req, res, next) {
  const { petId } = req.params; // Extract petId from URL parameters
  const userId = req.user.id;
  try {
    const pet = await Pet.findByPk(petId);
    if (!pet || pet.owner_id !== userId) {
      return res.status(403).json({ message: "You do not have permission to access this pet" });
    }

    req.pet = pet; // Attach the pet object to the request for later use
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/pets', authenticateToken, async (req                                                                                                           , res) => {
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

router.put('/pets/:petId', [authenticateToken, authorizePetOwner], async (req, res) => {
  const { name, species, breed, age, gender, weight } = req.body;
  const { petId } = req.params;

  try {
    // Validate input
    if (!name || !species || !breed || !age || !gender || !weight) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Update the pet's details
    await Pet.update(
      {
        name,
        species,
        breed,
        age,
        gender,
        weight,
      },
      {
        where: { id: petId },
      }
    );

    // Fetch the updated pet
    const updatedPet = await Pet.findByPk(petId);

    res.json(updatedPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post('/pets', [authenticateToken], async (req, res) => {
  const { name, species, breed, age, gender, weight } = req.body;
  const userId = req.user.id;

  try {
    // Validate input
    if (!name || !species || !breed || age === undefined || !gender || weight === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the pet in the database
    const newPet = await Pet.create({
      name,
      species,
      breed,
      age,
      gender,
      weight,
      owner_id: userId,
    });

    // Return the created pet
    res.status(201).json(newPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
const authorizeReceptionist = (req, res, next) => {
  if (req.user.role !== 'receptionist') {
    return res.status(403).json({ message: "Access denied. Receptionist role required." });
  }
  next();
};

// Get appointments for a specific specialist
router.get('/specialists/:specialistId/appointments', [authenticateToken, authorizeReceptionist], async (req, res) => {
  const { specialistId } = req.params;

  try {
    const appointments = await Appointment.findAll({
      where: { specialist_id: specialistId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Specialist,
          as: 'specialist',
          attributes: ['id', 'name', 'email'],
        },
      ],
      attributes: ['id', 'date', 'time', 'status', 'pet_name', 'species', 'breed'],
      order: [['date', 'ASC'], ['time', 'ASC']],
    });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;
