// D:/Website_IT/IT_Project_Back/routes/petRoutes.js (or similar)
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs'); // File system module
const Pet = require('../models/Pet');
const authenticateToken = require('../middleware/authMiddleware'); // Assuming you need auth

// --- Route to Upload Pet Photo ---
// Assuming petId is part of the URL, e.g., /api/pets/:petId/photo
router.post(
  '/:petId/photo',
  authenticateToken,
  upload.single('petPhoto'), // поле из form-data: petPhoto
  async (req, res) => {
    const { petId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: 'No photo file uploaded.' });
    }

    try {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found.' });
      }

      // Проверка, что текущий пользователь — владелец животного
      if (pet.owner_id !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this pet.' });
      }

      // Сохраняем фото в поле типа BLOB
      pet.photo = req.file.buffer;
      await pet.save();

      res.json({
        message: 'Pet photo uploaded successfully!',
        petId: pet.id
      });

    } catch (err) {
      console.error('Error uploading pet photo:', err);
      res.status(500).json({ message: 'Server error during photo upload.', error: err.message });
    }
  }
);
router.get('/:petId/photo', async (req, res) => {
  const { petId } = req.params;

  try {
    const pet = await Pet.findByPk(petId);

    if (!pet || !pet.photo) {
      return res.status(404).json({ message: 'Photo not found.' });
    }

    // Set the correct header (you can refine the MIME type if you store it separately)
    res.set('Content-Type', 'image/jpeg'); // or image/png if you know the MIME type in advance
    res.send(pet.photo); // return binary data as an image
  } catch (err) {
    console.error('Error fetching pet photo:', err);
    res.status(500).json({ message: 'Server error fetching photo.', error: err.message });
  }
});

// Make sure to serve your 'public' folder as static files in your main app.js or server.js
// Example: app.use(express.static(path.join(__dirname, 'public')));

module.exports = router;