const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    instructions: { type: [String], required: true },
    description: {
        type: String,
        required: true
    },
    timeLeft: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema, 'quiz');

module.exports = Quiz;
