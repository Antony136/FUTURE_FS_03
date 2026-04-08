const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
      notes
    });

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order placed successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PATCH /api/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
