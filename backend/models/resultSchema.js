const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    totalScore: Number,
    userScore: Number,
    percentage: Number,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAnswer' }]
}, { timestamps: true })

const Result = mongoose.model('Result', resultSchema, 'result');

module.exports = Result;