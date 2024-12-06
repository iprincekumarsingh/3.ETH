const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
c
// Add more route imports here as needed
// const userRoutes = require('./user.routes');
// router.use('/users', userRoutes);

module.exports = router; 