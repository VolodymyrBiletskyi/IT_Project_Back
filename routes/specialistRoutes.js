const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Service = require('../models/Service');
const Specialist = require('../models/Specialist');
const User = require('../models/User');
const authorizeDoctor = require('../middleware/authMiddleware');





// PATCH /api/pets/:petId - Update core pet details (Doctor only)
// This route remains unchanged from the previous state, only Owner/Admin can update pet details.
router.patch('/:petId', [authenticateToken], async (req, res) => {
  const { petId } = req.params;
  const loggedInUserId = req.user.id;
  const userRole = req.user.role;

  try {
    // 1. Find the pet first
    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    // 2. Authorization: Check if user is admin OR the owner
    const isOwner = pet.owner_id === loggedInUserId;
    const isAdmin = userRole ===  'doctor'; // Ensure 'admin' is a valid role

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Forbidden: Only the pet owner or an admin can update these details." });
    }

    // --- User is authorized (Owner or Admin) ---

    // 3. Extract allowed fields (excluding owner_id)
    const { name, species, breed, age, gender, weight } = req.body;

    // 4. Basic validation
    const providedKeys = Object.keys(req.body);
    const allowedUpdateKeys = ['name', 'species', 'breed', 'age', 'gender', 'weight'];
    const validKeysProvided = providedKeys.some(key => allowedUpdateKeys.includes(key));

    if (!validKeysProvided) {
      if (providedKeys.includes('owner_id') && providedKeys.length === 1) {
        return res.status(400).json({ message: "Owner ID cannot be changed via this endpoint. No other valid fields provided." });
      }
      return res.status(400).json({ message: "No valid update data provided (allowed fields: name, species, breed, age, gender, weight)." });
    }

    // 5. Build updateData
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (species !== undefined) updateData.species = species;
    if (breed !== undefined) updateData.breed = breed;
    if (age !== undefined) updateData.age = age;
    if (gender !== undefined) updateData.gender = gender;
    if (weight !== undefined) updateData.weight = weight;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update after filtering." });
    }

    // 6. Perform update
    await pet.update(updateData);

    // 7. Respond
    const updatedPet = await Pet.findByPk(petId, {
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'email', 'phone'] }]
    });
    res.status(200).json(updatedPet);

  } catch (err) {
    console.error(`Error updating pet ${petId} by user ${loggedInUserId}:`, err);
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: "Validation Error", errors: err.errors.map(e => e.message) });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/pets/all - Retrieve all pets (Doctor role required)
router.get('/all', [authenticateToken, authorizeDoctor], async (req, res) => {
  // authorizeDoctor ensures only doctors can proceed (doesn't need petId here)
  try {
    const pets = await Pet.findAll({
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'email', 'phone'] }],
      attributes: ['id', 'name', 'species', 'breed', 'age', 'gender', 'weight', 'owner_id', 'createdAt', 'updatedAt'],
      order: [['name', 'ASC']]
    });
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error fetching all pets for doctor:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/specialist/appointments - for specialists only
router.get('/appointments', [authenticateToken], async (req, res) => {
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
  const allowedStatuses = ['pending', 'on time', 'completed', 'canceled', 'delayed', 'no show'];
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

router.get('/appointments/on-time', [authenticateToken], async (req, res) => {
  try {
    const specialistId = req.user?.id;
    const userRole = req.user?.role;

    if (!specialistId || (userRole !== 'doctor' && userRole !== 'specialist')) {
      return res.status(403).json({ message: "Unauthorized: Not a specialist" });
    }

    const appointments = await Appointment.findAll({
      where: {
        specialist_id: specialistId,
        status: 'on time',
      },
      include: [
        { model: Pet, as: 'pet', attributes: ['id', 'name', 'species', 'breed'] },
        { model: Service, as: 'service', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['id', 'email', 'name'] },
      ],
      attributes: [
        'id', 'full_name', 'email', 'phone_number', 'pet_id', 'pet_name',
        'species', 'breed', 'service_id', 'specialist_id',
        'date', 'time', 'status', 'createdAt', 'updatedAt',
      ],
      order: [['date', 'ASC'], ['time', 'ASC']],
    });

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching confirmed appointments:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get('/appointments/canceled', [authenticateToken], async (req, res) => {
  try {
    const specialistId = req.user?.id;
    const userRole = req.user?.role;

    if (!specialistId || (userRole !== 'doctor' && userRole !== 'specialist')) {
      return res.status(403).json({ message: "Unauthorized: Not a specialist" });
    }

    const appointments = await Appointment.findAll({
      where: {
        specialist_id: specialistId,
        status: 'canceled',
      },
      include: [
        { model: Pet, as: 'pet', attributes: ['id', 'name', 'species', 'breed'] },
        { model: Service, as: 'service', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['id', 'email', 'name'] },
      ],
      attributes: [
        'id', 'full_name', 'email', 'phone_number', 'pet_id', 'pet_name',
        'species', 'breed', 'service_id', 'specialist_id',
        'date', 'time', 'status', 'createdAt', 'updatedAt',
      ],
      order: [['date', 'ASC'], ['time', 'ASC']],
    });

    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error fetching cancelled appointments:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;