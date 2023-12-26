const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const tokenVerifier = require('../middleware/verifyToken');

router.use('/auth', authRoutes);
router.use('/user', tokenVerifier, userRoutes);

module.exports = router;