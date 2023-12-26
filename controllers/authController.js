const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res, next) => {

    // Check for validation errors
    const customFormate = validationResult.withDefaults({
        formatter: error => error.msg,
    })
    const error = customFormate(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.mapped() });
    }

    const originalPassword = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(originalPassword, 10);
        req.body.password = hashedPassword;
        await User.create(req.body);
        return res.status(200).json({ message: "registration successfully." });
    } catch (err) {
        console.log(`something went wrong because of : ${err}`);
    }
}

exports.login = async (req, res, next) => {

    // Check for validation errors
    const customFormate = validationResult.withDefaults({
        formatter: error => error.msg,
    })
    const error = customFormate(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.mapped() });
    }

    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: username,
            },
        });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: "invalid username or password" });
        }

        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successfully", token: token });
    }
    catch (error) {
        console.log(`somting went wrong because of : ${error}`);
    }
    
}