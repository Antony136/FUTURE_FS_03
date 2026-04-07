const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');
const Contact = require('../models/Contact');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [menuCount, reservationCount, inquiryCount, todayReservations] = await Promise.all([
      MenuItem.countDocuments(),
      Reservation.countDocuments(),
      Contact.countDocuments(),
      Reservation.find({ date: { $gte: today }, status: { $ne: 'cancelled' } })
    ]);

    const guestsToday = todayReservations.reduce((sum, r) => sum + r.guests, 0);

    res.status(200).json({
      success: true,
      data: {
        menuItems: menuCount,
        reservations: reservationCount,
        inquiries: inquiryCount,
        guestsToday: guestsToday
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
