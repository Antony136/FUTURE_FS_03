const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/auth');

// All routes are protected and restricted to admin
router.use(protect);
router.use(restrictTo('admin'));

router.get('/stats', getStats);

module.exports = router;
