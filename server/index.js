const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables
dotenv.config();

// Import routes
const menuRoutes = require('./routes/menu');
const reservationRoutes = require('./routes/reservations');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Import DB config
const connectDB = require('./config/db');

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const orderRoutes = require('./routes/orderRoutes');

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🍽️ Savory Skies API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
