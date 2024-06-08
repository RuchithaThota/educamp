const mongoose = require('mongoose');
const questionOptionSchema = mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    option: String,
    isCorrect: { type: Boolean, required: true }
})
const QuestionOption = mongoose.model('QuestionOption', questionOptionSchema, 'question_options');

module.exports = QuestionOption;