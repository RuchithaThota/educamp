const mongoose = require('mongoose');
const keys = require('../config/keys');
const Question = require('../models/questionSchema');
const Quiz = require('../models/quizSchema');
const QuestionOption = require('../models/questionOptionSchema');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(keys.mongoURI)
        console.log(`Connected to mongodb successfully: 
        ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error Occurred While Connecting to mongodb: 
        ${error}`);
        process.exit();
    }
}
module.exports = connectDB;