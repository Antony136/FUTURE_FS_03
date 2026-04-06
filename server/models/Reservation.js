const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Reservation date is required'],
    },
    time: {
      type: String,
      required: [true, 'Reservation time is required'],
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least 1 guest is required'],
      max: [20, 'Maximum 20 guests per reservation'],
    },
    occasion: {
      type: String,
      enum: ['Birthday', 'Anniversary', 'Business', 'Date Night', 'Family Gathering', 'Other', ''],
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate confirmation code before save
reservationSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode = 'SS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

// Index for date-based queries
reservationSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
