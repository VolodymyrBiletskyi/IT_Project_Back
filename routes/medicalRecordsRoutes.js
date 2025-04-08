const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const MedicalRecord = require('../models/MedicalRecords');
const Pet = require('../models/Pet');

// Middleware to check if the user owns the pet
async function authorizePetOwner(req, res, next) {
  const { petId } = req.params;
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

// GET /api/pets/:petId/medical-record
// Retrieve the medical record for a specific pet
router.get('/:petId/medical-record', [authenticateToken, authorizePetOwner], async (req, res) => {
  try {
    const { petId } = req.params;

    // Find the medical record for the pet
    const medicalRecord = await MedicalRecord.findOne({
      where: { pet_id: petId },
    });

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.json(medicalRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/pets/:petId/medical-record
// Create or update the medical record for a specific pet
router.post('/:petId/medical-record', [authenticateToken, authorizePetOwner], async (req, res) => {
  try {
    const { petId } = req.params;
    const { medical_information, allergies, previous_diagnoses, prescriptions } = req.body;

    // Validate required fields
    if (!medical_information || !Array.isArray(allergies) || !Array.isArray(previous_diagnoses) || !Array.isArray(prescriptions)) {
      return res.status(400).json({ message: "Invalid or missing data in request body" });
    }

    // Check if a medical record already exists for the pet
    let medicalRecord = await MedicalRecord.findOne({ where: { pet_id: petId } });

    if (!medicalRecord) {
      // Create a new medical record
      medicalRecord = await MedicalRecord.create({
        pet_id: petId,
        medical_information,
        allergies,
        previous_diagnoses,
        prescriptions,
      });
    } else {
      // Update the existing medical record
      medicalRecord.update({
        medical_information,
        allergies,
        previous_diagnoses,
        prescriptions,
      });
    }

    res.json(medicalRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/pets/:petId/medical-record
// Delete the medical record for a specific pet
router.delete('/:petId/medical-record', [authenticateToken, authorizePetOwner], async (req, res) => {
  try {
    const { petId } = req.params;

    // Delete the medical record for the pet
    const deleted = await MedicalRecord.destroy({
      where: { pet_id: petId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.json({ message: "Medical record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;