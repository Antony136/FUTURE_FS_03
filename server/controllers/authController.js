const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper: Sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Helper: Send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  // Strip password before sending
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    message,
    token,
    data: user,
  });
};

// @desc    Register admin user (used once for seeding)
// @route   POST /api/auth/register
// @access  Public (should be disabled in production)
exports.register = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ success: false, message: 'Registration is disabled in production.' });
    }

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }

    const user = await User.create({ name, email, password, role });
    sendTokenResponse(user, 201, res, 'Admin registered successfully!');
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Select password explicitly (it's excluded by default)
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is deactivated.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res, '✅ Login successful!');
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged-in admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
