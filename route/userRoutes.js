const express = require('express');
const { info } = require('../controllers/userController');
const router = express.Router();

router.get("/info", info);

module.exports = router;