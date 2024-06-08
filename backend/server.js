const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes')
const quizRoutes = require('./routes/quizRoutes')
const questionRoutes = require("./routes/questionRoutes")
const passportSetup = require('./config/passportSetup');
const keys = require('./config/keys');
const passport = require('passport');
const app = express();

dotenv.config();
connectDB();
app.use(cors({ origin: keys.clientBaseUrl }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//passport
app.use(passport.initialize());
passportSetup();
//Routes
app.use('/auth', authRoutes)
app.use('/api/user', profileRoutes)
app.use("/api/question", questionRoutes)
app.use("/api/quiz", quizRoutes);
app.listen(keys.port, () => {
    console.log(`Listening to the port ${keys.port}`);
})