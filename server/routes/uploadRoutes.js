const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, restrictTo } = require('../middleware/auth');

// Configure Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private (Admin)
router.post('/', protect, restrictTo('admin'), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  
  // Format the path to be accessible via web (assuming uploads is served staticly)
  const filePath = `/${req.file.path.replace(/\\/g, '/')}`;
  
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    data: filePath
  });
});

module.exports = router;
