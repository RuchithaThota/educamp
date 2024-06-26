const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    googleId: String,
    username: String,
    profileUrl: String,
}, { timestamps: true })

const User = mongoose.model('User', userSchema);


module.exports = User;