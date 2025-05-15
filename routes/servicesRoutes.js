const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET /api/reasons - Fetch all reasons
router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll({
      attributes: ['id', 'description'],
    });

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;