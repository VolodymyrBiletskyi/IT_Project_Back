// D:/Website_IT/IT_Project_Back/routes/petRoutes.js (or similar)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // File system module
const Pet = require('../models/Pet');
const authenticateToken = require('../middleware/authMiddleware'); // Assuming you need auth

// --- Multer Configuration ---
// Define storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../public/uploads/pet_photos'); // Store in public/uploads/pet_photos
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename: petId-timestamp.extension
    const petId = req.params.petId; // Assuming petId is in route params
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `pet-${petId}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: fileFilter
});

// --- Route to Upload Pet Photo ---
// Assuming petId is part of the URL, e.g., /api/pets/:petId/photo
router.post(
  '/:petId/photo',
  authenticateToken, // Or your specific authorization middleware
  upload.single('petPhoto'), // 'petPhoto' is the name of the form field in your frontend
  async (req, res) => {
    const { petId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: 'No photo file uploaded.' });
    }

    try {
      const pet = await Pet.findByPk(petId);
      if (!pet) {
        // Optionally delete the uploaded file if pet not found
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'Pet not found.' });
      }
      // Check if the user is authorized to update this pet
      if (pet.owner_id !== req.user.id) {
        fs.unlinkSync(req.file.path); // Delete unauthorized upload
        return res.status(403).json({ message: 'You are not authorized to update this pet.' });
      }

      // Store the relative path or full URL in the database
      // Relative path from the 'public' folder if you serve static files from 'public'
      const photoUrl = `/uploads/pet_photos/${req.file.filename}`;

      // If a previous photo existed, you might want to delete it from the filesystem
      if (pet.photo_url) {
        const oldPhotoPath = path.join(__dirname, '../public', pet.photo_url);
        if (fs.existsSync(oldPhotoPath)) {
          try {
            fs.unlinkSync(oldPhotoPath);
            console.log('Old photo deleted:', oldPhotoPath);
          } catch (unlinkErr) {
            console.error('Error deleting old photo:', unlinkErr);
          }
        }
      }

      pet.photo_url = photoUrl;
      await pet.save();

      res.json({
        message: 'Pet photo uploaded successfully!',
        pet: pet, // Send back the updated pet object
        photoUrl: photoUrl // Or the full URL if you construct it
      });

    } catch (err) {
      console.error('Error uploading pet photo:', err);
      // If an error occurs after file upload, delete the uploaded file
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      if (err.message.startsWith('Not an image!')) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Server error during photo upload.', error: err.message });
    }
  }
);

// Make sure to serve your 'public' folder as static files in your main app.js or server.js
// Example: app.use(express.static(path.join(__dirname, 'public')));

module.exports = router;