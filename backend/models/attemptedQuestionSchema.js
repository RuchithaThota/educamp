const { default: mongoose } = require("mongoose");

const attemptedQuestionSchema = mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    selectedAnswerIndex: Number,
    isCorrect: Boolean,
    difficulty: String
})

const AttemptedQ = mongoose.model('attempted-question', attemptedQuestionSchema);

module.exports = AttemptedQ;