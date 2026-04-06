const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories,
} = require('../controllers/menuController');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', getAllMenuItems);
router.get('/categories', getCategories);
router.get('/:id', getMenuItemById);

// Admin-protected routes
router.post('/', protect, restrictTo('admin'), createMenuItem);
router.put('/:id', protect, restrictTo('admin'), updateMenuItem);
router.delete('/:id', protect, restrictTo('admin'), deleteMenuItem);

module.exports = router;
