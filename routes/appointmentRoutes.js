const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Service = require('../models/Service');
const Specialist = require('../models/Specialist');

// Middleware to check if the user owns the pet
async function authorizePetOwner(req, res, next) {
  const { petId } = req.body; // Extract petId from request body
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

// Helper functions
function generateTimeSlots(date) {
  const startTime = new Date(`${date}T08:00:00`);
  const endTime = new Date(`${date}T18:00:00`);
  const slots = [];

  let current = new Date(startTime);
  while (current <= endTime) {
    // Format time as "HH:mm:ss"
    const formattedTime = current.toTimeString().slice(0, 8); // e.g., "10:00:00"
    slots.push(formattedTime);

    current.setMinutes(current.getMinutes() + 30); // Increment by 30 minutes
  }

  return slots;
}

async function isSlotAvailable(date, specialistId, time) {
  const normalizedTime = new Date(`2000-01-01T${time}`).toISOString().slice(11, 19); // Convert to "10:00:00"

  const bookedAppointments = await Appointment.findOne({
    where: {
      date,
      specialist_id: specialistId,
      time: normalizedTime,
    },
  });

  return bookedAppointments === null;
}

router.get('/specialists', async (req, res) => {
  try {
    const specialists = await Specialist.findAll({
      attributes: ['id', 'name'],
    });

    res.json(specialists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/appointments/available-slots
// GET /api/appointments/available-slots
router.get('/appointments/available-slots', [authenticateToken], async (req, res) => {
  const { date, serviceId } = req.query;

  if (!date || !serviceId) {
    return res.status(400).json({ message: "Date and service ID are required" });
  }

  try {
    // Fetch all booked appointments for the given date and service
    const bookedAppointments = await Appointment.findAll({
      where: {
        date,
        service_id: serviceId,
      },
      attributes: ['time'],
    });

    // Generate all possible slots for the day
    const allSlots = generateTimeSlots(date);

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => {
      return !bookedAppointments.some(appointment => {
        // Normalize both slot and appointment.time to the same format
        const normalizedSlot = slot.slice(0, 5); // e.g., "10:00"
        const normalizedAppointmentTime = appointment.time.slice(0, 5); // e.g., "10:00"
        return normalizedSlot === normalizedAppointmentTime;
      });
    });

    res.json(availableSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/appointments
router.post('/appointments', async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    petId, // Optional field
    species,
    breed,
    serviceId,
    specialistId,
    date,
    time,
  } = req.body;

  try {
    // Validate input
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !species ||
      !breed ||
      !serviceId ||
      !specialistId ||
      !date ||
      !time
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // If petId is provided, validate it
    if (petId) {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        return res.status(400).json({ message: "Invalid pet ID" });
      }
    }

    // Create the appointment
    const appointment = await Appointment.create({
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      pet_id: petId, // Optional field
      species,
      breed,
      service_id: serviceId,
      specialist_id: specialistId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;