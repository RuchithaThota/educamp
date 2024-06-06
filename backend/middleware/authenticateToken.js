const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/userSchema');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]
    if (!authHeader || !token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jwt.verify(token, keys.jwtSecret);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(400).send('User does not exist!')
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
}

module.exports = authenticateToken;