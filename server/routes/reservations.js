const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} = require('../controllers/reservationController');
const { protect, restrictTo } = require('../middleware/auth');

// Public route
router.post('/', createReservation);

// Admin-protected routes
router.get('/', protect, restrictTo('admin'), getAllReservations);
router.get('/:id', protect, restrictTo('admin'), getReservationById);
router.patch('/:id/status', protect, restrictTo('admin'), updateReservationStatus);
router.delete('/:id', protect, restrictTo('admin'), deleteReservation);

module.exports = router;
