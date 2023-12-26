const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;