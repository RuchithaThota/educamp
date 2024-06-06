const dotenv = require('dotenv')
dotenv.config();
const keys = {
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || 'jwt_secret_token',
    sessionSecret: process.env.SESSION_SECRET || 'session_secret_token',
    port: process.env.PORT || 5000,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
};
module.exports = keys;
