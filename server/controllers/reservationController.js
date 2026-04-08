const Reservation = require('../models/Reservation');

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Public
exports.createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, occasion, message } = req.body;

    // Validate that reservation is not in the past
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (reservationDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Reservation date cannot be in the past.',
      });
    }

    const reservationData = {
      name,
      email,
      phone,
      date: reservationDate,
      time,
      guests,
      occasion,
      message,
    };

    // Link to user if logged in
    if (req.user) {
      reservationData.user = req.user._id;
    }

    const reservation = await Reservation.create(reservationData);

    res.status(201).json({
      success: true,
      message: `🎉 Reservation confirmed! Your code: ${reservation.confirmationCode}`,
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user reservations
// @route   GET /api/reservations/my-reservations
// @access  Private
exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ 
      $or: [
        { user: req.user._id },
        { email: req.user.email } // Fallback for reservations made before linking
      ]
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reservations (Admin)
// @route   GET /api/reservations
// @access  Private (Admin)
exports.getAllReservations = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    const reservations = await Reservation.find(filter).sort({ date: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single reservation by ID
// @route   GET /api/reservations/:id
// @access  Private (Admin)
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update reservation status (Admin)
// @route   PATCH /api/reservations/:id/status
// @access  Private (Admin)
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.status(200).json({
      success: true,
      message: `Reservation status updated to "${status}"`,
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a reservation (Admin)
// @route   DELETE /api/reservations/:id
// @access  Private (Admin)
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.status(200).json({ success: true, message: 'Reservation deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
