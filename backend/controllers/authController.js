const { matchedData } = require("express-validator");
const User = require("../models/userSchema");
const bcrypt = require('bcrypt');
const generateToken = require("../helpers/generateToken");
const generateExpirationTime = require("../helpers/generateExpirationTime");
const generateOTP = require("../helpers/generateOtp");
const PasswordReset = require("../models/passwordResetSchema");
const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const getResponseUser = require("../helpers/getResponseUser");

const user_signup = async (req, res) => {
    const { name, email, password } = matchedData(req);
    let user = await User.findOne({ email });
    if (!user) {
        //New user signup with email & password
        const hashPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashPassword,
        });
        const newUser = await user.save();
        const responseUser = getResponseUser(newUser);
        const signupUser = { ...responseUser, token: generateToken(newUser._id) }
        return res.status(200).json({ msg: 'Welcome to our platform!', user: signupUser })
    } else if (user.googleId && !(user.name && user.password)) {
        // User signed up with Google, now adding email and password
        user.name = name;
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        const responseUser = getResponseUser(user);
        return res.status(200).json({
            msg: 'Email and password linked to your Google account successfully!',
            user: { ...responseUser, token: generateToken(user._id) }
        })
    } else {
        return res.status(400).send('User already exists!')
    }
}

const sendEmailVerificationCode = async (email, otp) => {
    const mailOptions = {
        from: keys.emailUser,
        to: email,
        subject: `Your activation code: ${otp}`,
        html: `<h3>Hello!</h3><p>it's great to have you with us! To finish the registration,
        enter or copy this code in the browser where you signed up.
        your code will expires in 15min</p><h2>${otp}</h2>`
    };
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: keys.emailUser,
            pass: keys.emailPassword
        }
    })
    await transporter.sendMail(mailOptions);
}

const user_verifyEmail = async (req, res) => {
    const { email, otp } = req;
    try {
        const user = await User.findOne({ email, verificationCode: otp });
        if (!user || user.verificationCodeExpires < Date.now()) {
            return res.status(400).send('Invalid email or verification code');
        }
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();
        res.send('Email verified successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const user_login = async (req, res) => {
    const { email, password } = matchedData(req);
    const user = await User.findOne({ email });
    if (!user) { return res.status(400).send('User does not exist!') }
    if (user.googleId && !user.password) return res.status(400).send(
        'You have previously signed up with Google account');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) { return res.status(400).send('Wrong password!') }
    const token = generateToken(user._id);
    const responseUser = getResponseUser(user);
    return res.status(200).json({ msg: 'Welcome back!!', user: { ...responseUser, token } })
}

const user_forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User does not exist');
    const otp = generateOTP();
    const expirationTime = generateExpirationTime();
    const record = await PasswordReset.findOne({ email });
    if (record) {
        record.otp = otp;
        record.expirationTime = expirationTime;
        await record.save();
    } else {
        const newRecord = new PasswordReset({ email, otp, expirationTime });
        await newRecord.save();
    }
    try {
        await sendOTPByEmail(email, otp);
        return res.status(200).send('A 6 digits OTP send to your email!')
    } catch (err) {
        return res.status(500).send(err.toString())
    }
}

const sendOTPByEmail = async (email, otp) => {
    const mailOptions = {
        from: keys.emailUser,
        to: email,
        subject: `Password Reset Code:${otp}`,
        html: `<h3>Hello!</h3><p>your reset password code will expires in 15min</p><h2>${otp}</h2>`
    };
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: keys.emailUser,
            pass: keys.emailPassword
        }
    })
    await transporter.sendMail(mailOptions);
}

const user_verifyResetPasswordOtp = async (req, res) => {
    const { email, otp } = req.body;
    const passwordReset = await PasswordReset.findOne({ email });
    if (!passwordReset) {
        return res.status(400).send('Password reset entry not found');
    }
    if (passwordReset.otp === otp && passwordReset.expirationTime > new Date()) {
        return res.status(200).send('OTP verified!');
    } else {
        return res.status(400).send('Invalid OTP!');
    }
}

const user_resetPassword = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
    if (updatedUser) return res.status(200).send('Password reset success!');
    return res.status(500).send('Something went wrong!')
}

const user_google_callback = async (req, res) => {
    const { user, token } = req.user;
    return res.redirect(`${keys.clientBaseUrl}/auth/success?token=${token}`);
}


module.exports = {
    user_signup,
    user_verifyEmail,
    user_login,
    user_forgotPassword,
    user_verifyResetPasswordOtp,
    user_resetPassword,
    user_google_callback,

}