const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticateToken = require('../middleware/authMiddleware');
const Pet = require('../models/Pet');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Service = require('../models/Service');
const Specialist = require('../models/Specialist');
const SALT_ROUNDS = 10;
const DEFAULT_NEW_OWNER_PASSWORD = "Password123!";

// Middleware to check if the user is a receptionist
const isReceptionist = (req, res, next) => {
  if (req.user && req.user.role === 'receptionist') {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Receptionist role required." });
  }
};
router.post('/pets', [authenticateToken, isReceptionist], async (req, res) => {
  try {
    const {
      pet_name, // Renamed from 'name' for clarity if 'name' is also used for owner
      species,
      breed,
      gender,
      age,
      weight,
      owner_name,
      owner_phone,
      owner_email
    } = req.body;

    // Validate required fields
    if (!pet_name || !species || !owner_name || !owner_phone || !owner_email) {
      return res.status(400).json({
        message: "Pet name, species, owner name, owner phone, and owner email are required."
      });
    }

    let owner;
    let ownerId;

    // Check if owner already exists by email
    const existingOwner = await User.findOne({ where: { email: owner_email } });

    if (existingOwner) {
      owner = existingOwner;
      ownerId = existingOwner.id;
      // Optionally, you might want to update existing owner's phone or name if they differ,
      // but for now, we'll just use the existing owner.
      // if (existingOwner.name !== owner_name || existingOwner.phone !== owner_phone) {
      //   existingOwner.name = owner_name;
      //   existingOwner.phone = owner_phone;
      //   await existingOwner.save();
      // }
    } else {
      // Create a new owner
      const hashedPassword = await bcrypt.hash(DEFAULT_NEW_OWNER_PASSWORD, SALT_ROUNDS);
      try {
        owner = await User.create({
          name: owner_name,
          email: owner_email,
          phone: owner_phone,
          password: hashedPassword,
          role: 'owner' // Default role for newly created owners
        });
        ownerId = owner.id;
      } catch (userCreationError) {
        // Handle potential unique constraint errors for email if another request created it concurrently
        if (userCreationError.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({ message: "An owner with this email was just created or already exists. Please try again or search for the owner." });
        }
        throw userCreationError; // Re-throw other errors
      }
    }

    // Create the new pet
    const newPet = await Pet.create({
      name: pet_name,
      species,
      breed: breed || null, // Optional
      gender: gender || null, // Optional
      age: age || null, // Optional
      weight: weight || null, // Optional
      owner_id: ownerId
    });

    // Respond with the created pet and owner information (optional)
    res.status(201).json({
      message: "Pet and owner processed successfully.",
      pet: newPet,
      owner: { // Sending back some owner details can be useful
        id: owner.id,
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        isNew: !existingOwner // Flag to indicate if owner was newly created
      }
    });

  } catch (err) {
    console.error('Error adding new pet and owner:', err);
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: "Validation error", error: err.message, details: err.errors });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get a specific pet's details
router.get('/pets/:id', [authenticateToken, isReceptionist], async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (err) {
    console.error('Error fetching pet details:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get appointments for a specific pet
router.get('/pets/:id/appointments', [authenticateToken, isReceptionist], async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { pet_id: req.params.id },
      include: [
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'name'],
        },
        {
          model: Specialist,
          as: 'specialist',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['date', 'ASC'], ['time', 'ASC']],
    });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching pet appointments:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Create a new appointment for a pet
router.post('/pets/:id/appointments', [authenticateToken, isReceptionist], async (req, res) => {
  try {
    const { service_id, specialist_id, date, time } = req.body;

    // Fetch the pet AND its associated owner
    const pet = await Pet.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'owner',
      }]
    });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Add a defensive check to ensure pet.owner is populated
    if (!pet.owner) {
      console.error(`Pet with ID ${pet.id} (owner_id: ${pet.owner_id}) was found, but its associated owner data could not be loaded. Check the User table for an entry with id=${pet.owner_id}.`);
      return res.status(500).json({ message: "Server error: Pet owner information is missing or could not be loaded." });
    }

    // Ensure your User model has a 'phone' field, or adjust this line.
    // If User model has 'phone_number', use pet.owner.phone_number
    const ownerPhoneNumber = pet.owner.phone || pet.owner.phone_number || 'N/A'; // Fallback if phone is not present

    const newAppointment = await Appointment.create({
      pet_id: pet.id,
      user_id: pet.owner_id, // Store the owner's ID directly on the appointment
      service_id,
      specialist_id,
      date,
      time,
      full_name: pet.owner.name,   // Now pet.owner should be defined
      email: pet.owner.email,     // Now pet.owner should be defined
      phone_number: ownerPhoneNumber, // Use the resolved phone number
      pet_name: pet.name,
      species: pet.species,
      breed: pet.breed,
      status: 'Pending'
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update an appointment
router.put('/appointments/:id', [authenticateToken, isReceptionist], async (req, res) => {
  try {
    const { service_id, specialist_id, date, time, status } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await appointment.update({ service_id, specialist_id, date, time, status });
    res.json(appointment);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;