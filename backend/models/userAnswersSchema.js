const mongoose = require('mongoose');

const userAnswersSchema = mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resultId: { type: mongoose.Schema.Types.ObjectId, ref: 'Result' },
    selectedOption: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionOption' },
    isCorrect: Boolean
})
const UserAnswer =
    mongoose.model('UserAnswer', userAnswersSchema, 'user_answers')
module.exports = UserAnswer;