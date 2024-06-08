const { default: mongoose } = require("mongoose");

const questionSchema = mongoose.Schema({
    text: { type: String, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    tag: { type: String, required: true },
    points: { type: String, required: true },
    difficulty: { type: String, required: true },
    correct_option: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionOption', required: true },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionOption' }],
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;