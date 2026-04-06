const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getAllMenuItems = async (req, res) => {
  try {
    const { category, isVeg, isFeatured, search, sort } = req.query;

    // Build filter object
    const filter = { isAvailable: true };
    if (category) filter.category = category;
    if (isVeg !== undefined) filter.isVeg = isVeg === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    // Handle text search
    let query = MenuItem.find(filter);
    if (search) {
      query = MenuItem.find({ ...filter, $text: { $search: search } });
    }

    // Sorting
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
      rating: { rating: -1 },
    };
    query = query.sort(sortOptions[sort] || { createdAt: -1 });

    const menuItems = await query;

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new menu item (Admin)
// @route   POST /api/menu
// @access  Private (Admin)
exports.createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, message: 'Menu item created!', data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a menu item (Admin)
// @route   PUT /api/menu/:id
// @access  Private (Admin)
exports.updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, message: 'Menu item updated!', data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a menu item (Admin)
// @route   DELETE /api/menu/:id
// @access  Private (Admin)
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all unique categories
// @route   GET /api/menu/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category', { isAvailable: true });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
