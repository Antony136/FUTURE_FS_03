const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Starters', 'Soups', 'Salads', 'Main Course', 'Breads', 'Desserts', 'Beverages', 'Specials'],
    },
    image: {
      type: String,
      default: '',
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Hot', 'Extra Hot', 'None'],
      default: 'None',
    },
    tags: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  }
);

// Index for faster search queries
menuItemSchema.index({ name: 'text', description: 'text' });
menuItemSchema.index({ category: 1, isAvailable: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
