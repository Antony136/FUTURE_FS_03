const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getMyOrders, 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, restrictTo('admin'), getAllOrders);
router.patch('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

module.exports = router;
