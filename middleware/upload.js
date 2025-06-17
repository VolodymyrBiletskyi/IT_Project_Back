const multer = require('multer');

// Store uploaded file in memory (for saving as BLOB)
const storage = multer.memoryStorage();

// Accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

// Limit file size to 5MB and apply image-only filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter: fileFilter
});

module.exports = upload;
