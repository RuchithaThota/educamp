const { Router } = require("express");
const { user_signup, user_login, user_forgotPassword, user_resetPassword, user_google_callback, user_verifyResetPasswordOtp, user_verifyEmail } = require("../controllers/authController");
const { signupValidationRules, loginValidationRules, validate } = require("../validators/userValidator");
const passport = require("passport");

const router = Router();
router.post('/signup', signupValidationRules(), validate, user_signup);
router.post('/login', loginValidationRules(), validate, user_login);
router.post('/forgot-password', user_forgotPassword);
router.post('/verify/reset-password/otp', user_verifyResetPasswordOtp);
router.post('/verify/email', user_verifyEmail);
router.post('/reset-password', user_resetPassword);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { session: false }), user_google_callback)

module.exports = router;