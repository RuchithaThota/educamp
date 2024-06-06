const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userSchema');
const generateToken = require('../helpers/generateToken');

const passportSetup = () => {
    return passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                profileUrl: profile.photos[0].value
            })
            await user.save();
        }
        if (user && !user.googleId) {
            user.username = profile.displayName;
            user.googleId = profile.id;
            user.profileUrl = profile.photos[0].value;
            await user.save();
        }
        token = generateToken(user._id)
        done(null, { user, token });
    }))
}

module.exports = passportSetup;





