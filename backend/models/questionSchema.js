const { default: mongoose } = require("mongoose");

const questionSchema = mongoose.Schema({
    question: String,
    tag: String,
    difficulty: String,
    options: [String],
    answerIndex: Number,
    points: Number,
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;