const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllInquiries,
  markAsRead,
  deleteInquiry,
} = require('../controllers/contactController');
const { protect, restrictTo } = require('../middleware/auth');

// Public route
router.post('/', submitContact);

// Admin-protected routes
router.get('/', protect, restrictTo('admin'), getAllInquiries);
router.patch('/:id/read', protect, restrictTo('admin'), markAsRead);
router.delete('/:id', protect, restrictTo('admin'), deleteInquiry);

module.exports = router;
