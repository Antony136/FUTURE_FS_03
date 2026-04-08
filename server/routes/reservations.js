const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getMyReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} = require('../controllers/reservationController');
const { protect, restrictTo, optionalProtect } = require('../middleware/auth');

// Public route (optional auth to link reservation)
router.post('/', optionalProtect, createReservation);

// User specific routes
router.get('/my-reservations', protect, getMyReservations);

// Admin-protected routes
router.get('/', protect, restrictTo('admin'), getAllReservations);
router.get('/:id', protect, restrictTo('admin'), getReservationById);
router.patch('/:id/status', protect, restrictTo('admin'), updateReservationStatus);
router.delete('/:id', protect, restrictTo('admin'), deleteReservation);

module.exports = router;
