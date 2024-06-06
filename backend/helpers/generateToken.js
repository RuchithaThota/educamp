const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const generateToken = (userId) => {
    return jwt.sign({ userId }, keys.jwtSecret, { expiresIn: '7d' })
}
module.exports = generateToken;