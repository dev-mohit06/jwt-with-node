const express = require('express');
const router = express.Router();

const { registrationValidation,loginValidation } = require('../middleware/validators/authValidator');
const { createUser,login } = require('../controllers/authController');


router.post('/register',registrationValidation,createUser);
router.post('/login',loginValidation,login);

module.exports = router;