const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const Review = require('../models/Review');
const Service = require('../models/Service');
const Specialist = require('../models/Specialist');

// Submit a review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { service_id, specialist_id, rating, comment } = req.body;
    const user_id = req.user.id;

    // Check if the service and specialist exist
    const service = await Service.findByPk(service_id);
    const specialist = await Specialist.findByPk(specialist_id);

    if (!service || !specialist) {
      return res.status(404).json({ message: 'Service or Specialist not found' });
    }

    // Create the review
    const review = await Review.create({
      service_id,
      specialist_id,
      user_id,
      rating,
      comment,
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        service_name: service.name,
        doctor_name: specialist.name,
      },
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get reviews for a specific service
router.get('/service/:id', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { service_id: req.params.id },
      include: [
        { model: Service, attributes: ['name'] },
        { model: Specialist, attributes: ['name'] },
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get reviews for a specific doctor
router.get('/doctor/:id', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { specialist_id: req.params.id },
      include: [
        { model: Service, attributes: ['name'] },
        { model: Specialist, attributes: ['name'] },
      ],
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;