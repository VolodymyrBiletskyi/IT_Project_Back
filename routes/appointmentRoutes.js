const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Service = require('../models/Service');
const Specialist = require('../models/Specialist');
const User = require('../models/User');
const mailer = require('../controllers/mailer');

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


router.get('/all-specialists', async (req, res) => {

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

router.get('/appointments/available-slots', async (req, res) => {

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
router.post('/appointments', optionalAuthMiddleware, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      petId,
      petName,
      species,
      breed,
      serviceId,
      specialistId,
      date,
      time
    } = req.body;

    let userId = null;
    let user = null;

    // Check if the user is authenticated
    if (req.user) {
      userId = req.user.id;
      user = await User.findByPk(userId);
    }

    // Validate required fields
    if (!serviceId || !specialistId || !date || !time) {
      return res.status(400).json({ message: "All appointment details are required" });
    }

    // If user is not authenticated, require full name, email, and phone number
    if (!user && (!fullName || !email || !phoneNumber)) {
      return res.status(400).json({ message: "Full name, email, and phone number are required for unregistered users" });
    }

    // Validate pet information
    if (!petId && (!petName || !species || !breed)) {
      return res.status(400).json({ message: "Pet information is required" });
    }

    let pet;
    if (petId) {
      // If petId is provided, fetch the pet details
      pet = await Pet.findByPk(petId);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      // If user is logged in, check if the pet belongs to the user
      if (userId && pet.owner_id !== userId) {
        return res.status(403).json({ message: "This pet doesn't belong to the user" });
      }
    }

    // Create the appointment
    const newAppointment = await Appointment.create({
      user_id: userId,
      pet_id: pet ? pet.id : null,
      full_name: user ? user.name : fullName,
      email: user ? user.email : email,
      phone_number: user ? user.phone : phoneNumber,
      pet_name: pet ? pet.name : petName,
      species: pet ? pet.species : species,
      breed: pet ? pet.breed : breed,
      service_id: serviceId,
      specialist_id: specialistId,
      date,
      time,
      status: 'Pending'
    });

    // Fetch the created appointment with associated data
    const appointmentWithDetails = await Appointment.findByPk(newAppointment.id, {
      include: [
        {
          model: Specialist,
          as: 'specialist',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      attributes: ['id', 'date', 'time', 'status', 'pet_name', 'species', 'breed', 'full_name', 'email', 'phone_number'],
    });

    res.status(201).json(appointmentWithDetails);


    // Send confirmation email
    mailer.sendMail({
      to: email,
      subject: "Appointment Confirmation - PawCare",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Dear ${fullName},</p>
        <p>Your appointment has been successfully scheduled.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Pet:</strong> ${pet.name}</p>
        <p><strong>Species:</strong> ${species}</p>
        <p><strong>Breed:</strong> ${breed}</p>
        <p><strong>Service:</strong> ${serviceId}</p>
        <p>Thank you for choosing PawCare!</p>
      `
    }).then(() => {
      console.log("Appointment confirmation email sent.");
    }).catch((err) => {
      console.error("Error sending appointment email:", err);
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }

});

router.get('/appointments', optionalAuthMiddleware, async (req, res) => {
  try {
    let appointments;
    const { email, phoneNumber } = req.query;

    if (req.user) {
      // User is authenticated
      const userId = req.user.id;

      // Fetch appointments for authenticated users (owners)
      appointments = await Appointment.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Specialist,
            as: 'specialist',
            attributes: ['id', 'name', 'email'],
          },
        ],
        attributes: ['id', 'date', 'time', 'status', 'pet_name', 'species', 'breed', 'full_name', 'email', 'phone_number'],
        order: [['date', 'ASC'], ['time', 'ASC']],
      });
    } else if (email && phoneNumber) {
      // User is not authenticated, but provided email and phone number
      appointments = await Appointment.findAll({
        where: {
          email: email,
          phone_number: phoneNumber
        },
        include: [
          {
            model: Specialist,
            as: 'specialist',
            attributes: ['id', 'name', 'email'],
          },
        ],
        attributes: ['id', 'date', 'time', 'status', 'pet_name', 'species', 'breed', 'full_name', 'email', 'phone_number'],
        order: [['date', 'ASC'], ['time', 'ASC']],
      });
    } else {
      return res.status(400).json({ message: "Email and phone number are required for unauthenticated users" });
    }

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/specialist/appointments - for specialists only
router.get('/specialist/appointments', [authenticateToken], async (req, res) => {
  try {
    // Assuming your authenticateToken middleware now attaches the specialist object to req.user
    // if the token belongs to a specialist.

    const specialistId = req.user ? req.user.id : null;
    const userRole = req.user ? req.user.role : null;

    if (!specialistId || (userRole !== 'doctor' && userRole !== 'specialist')) {
      return res.status(403).json({ message: "Unauthorized: Not a specialist" });
    }

    const appointments = await Appointment.findAll({
      where: {
        specialist_id: specialistId,
      },
      include: [
        {
          model: Pet,
          as: 'pet',
          attributes: ['id', 'name', 'species', 'breed'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'name'],
        },
        {
          model: User, // If you want user details
          as: 'user',
          attributes: ['id', 'email', 'name'],
        },
      ],
      attributes: [
        'id',
        'full_name',
        'email',
        'phone_number',
        'pet_id',
        'pet_name',
        'species',
        'breed',
        'service_id',
        'specialist_id',
        'date',
        'time',
        'status',
        'createdAt',
        'updatedAt',
      ],
      order: [['date', 'ASC'], ['time', 'ASC']],
    });

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching specialist appointments:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



router.patch('/appointments/:appointmentId/status', [authenticateToken], async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body; // Expecting { "status": "on time" } or similar
  const specialistId = req.user.id;
  const userRole = req.user.role;

  // 1. Authorization: Check if user is a specialist
  if (userRole !== 'doctor' && userRole !== 'specialist') {

    return res.status(403).json({ message: "Forbidden: Only specialists can update appointment status." });
  }

  // 2. Validation: Check if status is provided and valid
  // Define the statuses you want to allow specialists to set
  const allowedStatuses = ['pending', 'on time', 'completed', 'cancelled', 'delayed', 'no show'];
  if (!status) {
    return res.status(400).json({ message: "Status is required in the request body." });
  }
  const lowerCaseStatus = status.toLowerCase(); // Normalize status
  if (!allowedStatuses.includes(lowerCaseStatus)) {
    return res.status(400).json({ message: `Invalid status value. Allowed statuses are: ${allowedStatuses.join(', ')}` });
  }

  try {
    // 3. Find the appointment
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // 4. Authorization: Check if the appointment belongs to this specialist
    if (appointment.specialist_id !== specialistId) {
      // Log this attempt for security monitoring if desired
      console.warn(`Specialist ${specialistId} attempted to update status for appointment ${appointmentId} belonging to specialist ${appointment.specialist_id}`);
      return res.status(403).json({ message: "Forbidden: You can only update status for your own appointments." });
    }

    // 5. Update the status
    appointment.status = lowerCaseStatus; // Use the normalized status
    await appointment.save();

    // 6. Respond with success
    // Optionally include the updated appointment in the response
    res.json({ message: `Appointment status updated successfully to '${lowerCaseStatus}'.`, appointment });

  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;