const mongoose = require('mongoose');

const passwordResetSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expirationTime: { type: Date, required: true }
})

const PasswordReset = mongoose.model('password-reset', passwordResetSchema);

module.exports = PasswordReset;