const Contact = require('../models/Contact');

// @desc    Submit a contact inquiry
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const inquiry = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "✅ Thank you for reaching out! We'll get back to you within 24 hours.",
      data: { id: inquiry._id, createdAt: inquiry.createdAt },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact inquiries (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
exports.getAllInquiries = async (req, res) => {
  try {
    const { isRead } = req.query;
    const filter = {};
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const inquiries = await Contact.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark inquiry as read (Admin)
// @route   PATCH /api/contact/:id/read
// @access  Private (Admin)
exports.markAsRead = async (req, res) => {
  try {
    const inquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, repliedAt: new Date() },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Marked as read', data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete inquiry (Admin)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Contact.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
