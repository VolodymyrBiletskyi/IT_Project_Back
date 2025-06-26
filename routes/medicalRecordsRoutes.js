const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const MedicalRecord = require('../models/MedicalRecords');
const Pet = require('../models/Pet');
const User = require('../models/User');

// --- NEW Middleware ---

// Middleware to check if the user is a Doctor
// Also ensures the pet exists if petId is in params
async function authorizeDoctor(req, res, next) {
  const userRole = req.user.role;
  const petId = req.params.petId; // Get petId if present in the route

  // 1. Check Role
  // Ensure 'doctor' is a valid role in your User model ENUM
  if (userRole !== 'doctor' && userRole !== 'specialist') {

    return res.status(403).json({ message: "Forbidden: Only doctors can perform this action." });
  }

  // 2. Check Pet Existence (if petId is relevant for the route)
  if (petId) {
    try {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found." });
      }
      req.pet = pet; // Attach pet to request if found
    } catch (err) {
      console.error("Error finding pet in authorizeDoctor:", err);
      return res.status(500).json({ message: "Server error during authorization check." });
    }
  }

  // 3. Proceed if checks pass
  next();
}

// Middleware to check if the user can VIEW a specific pet's record
// Allows: Doctor, Specialist, or the Pet's Owner
async function authorizeViewer(req, res, next) {
  const petId = req.params.petId;
  const userId = req.user.id;
  const userRole = req.user.role;

  if (!petId) {
    // Should not happen if route is defined correctly, but good practice
    return res.status(400).json({ message: "Pet ID is required in the URL." });
  }

  try {
    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    // Check if user is Doctor, Specialist, or the Owner
    if (userRole === 'doctor' || userRole === 'specialist' || pet.owner_id === userId) {
      req.pet = pet; // Attach pet
      return next(); // Allow access
    }

    // If none of the above, deny access
    return res.status(403).json({ message: "Forbidden: You do not have permission to view this pet's records." });

  } catch (err) {
    console.error("Error in authorizeViewer:", err);
    return res.status(500).json({ message: "Server error during authorization." });
  }
}

// --- Routes ---

// GET /api/pets/:petId/medical-record
// Retrieve the medical record for a specific pet (Doctor, Specialist, or Owner)
router.get('/:petId/medical-record', [authenticateToken, authorizeViewer], async (req, res) => {
  // authorizeViewer ensures only allowed roles/owner can proceed
  try {
    const { petId } = req.params;
    const medicalRecord = await MedicalRecord.findOne({ where: { pet_id: petId } });
    res.status(200).json(medicalRecord || null); // Return null if not found
  } catch (err) {
    console.error("Error fetching medical record:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// POST /api/pets/:petId/medical-record
// Create or update the medical record for a specific pet (Specialist allowed by current middleware)
router.post('/:petId/medical-record', [authenticateToken, authorizeDoctor], async (req, res) => {
  // authorizeDoctor ensures only specialists (based on current code) can proceed and pet exists
  try {
    const { petId } = req.params;
    // *** SIMPLIFIED FIELD EXTRACTION ***
    const {
      medical_information, // This will hold the structured text
      allergies,
      previous_diagnoses,
      prescriptions,
      notes
    } = req.body;

    // *** SIMPLIFIED VALIDATION ***
    // Check if at least one of the intended fields is provided
    if (medical_information === undefined && allergies === undefined && previous_diagnoses === undefined && prescriptions === undefined && notes === undefined) {
      return res.status(400).json({ message: "At least one medical field (medical_information, allergies, etc.) must be provided." });
    }

    // *** SIMPLIFIED recordData ***
    const recordData = { pet_id: petId };
    if (medical_information !== undefined) recordData.medical_information = medical_information; // Save the string as is
    if (allergies !== undefined) recordData.allergies = allergies;
    if (previous_diagnoses !== undefined) recordData.previous_diagnoses = previous_diagnoses;
    if (prescriptions !== undefined) recordData.prescriptions = prescriptions;
    if (notes !== undefined) recordData.notes = notes;
    // Removed general_health, previous_surgeries, other_conditions

    const [medicalRecord, created] = await MedicalRecord.findOrCreate({
      where: { pet_id: petId },
      defaults: recordData
    });

    if (!created) {
      // *** SIMPLIFIED updateData ***
      const updateData = {};
      if (req.body.hasOwnProperty('medical_information')) updateData.medical_information = medical_information;
      if (req.body.hasOwnProperty('allergies')) updateData.allergies = allergies;
      if (req.body.hasOwnProperty('previous_diagnoses')) updateData.previous_diagnoses = previous_diagnoses;
      if (req.body.hasOwnProperty('prescriptions')) updateData.prescriptions = prescriptions;
      if (req.body.hasOwnProperty('notes')) updateData.notes = notes;
      // Removed general_health, previous_surgeries, other_conditions

      await medicalRecord.update(updateData);
      await medicalRecord.reload();
    }

    res.status(created ? 201 : 200).json(medicalRecord);
  } catch (err) {
    console.error("Error creating/updating medical record:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/pets/:petId/medical-record
// Delete the medical record for a specific pet (Doctor Only)
router.delete('/:petId/medical-record', [authenticateToken, authorizeDoctor], async (req, res) => {
  // authorizeDoctor ensures only doctors can proceed and pet exists
  try {
    const { petId } = req.params; // Pet existence already checked by middleware
    const deletedCount = await MedicalRecord.destroy({ where: { pet_id: petId } });

    if (deletedCount === 0) {
      // This case means the pet exists (checked by middleware) but had no record
      return res.status(404).json({ message: "Medical record not found for this pet, nothing deleted." });
    }

    res.status(200).json({ message: "Medical record deleted successfully." });
  } catch (err) {
    console.error("Error deleting medical record:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});







module.exports = router;