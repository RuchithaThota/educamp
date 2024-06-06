const AttemptedQ = require("../models/attemptedQuestionSchema");
const Question = require("../models/questionSchema")

const all_questions = async (req, res) => {
    try {
        const allQuestions = await Question.find({});
        return res.status(200).send(allQuestions);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const add_questions = async (req, res) => {
    try {
        const questions = req.body;
        await Question.insertMany(questions);
        res.status(200).send('Questions added successfully!');
    } catch (error) {
        res.status(500).send('Error adding questions: ' + error.message);
    }
}

const attempted_question = async (req, res) => {
    const userId = req.user._id;
    const { selectedAnswerIndex, questionId } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).send('Question not found');
        let attemptedQ = await AttemptedQ.findOne({ questionId });
        const isCorrect = question.answerIndex === selectedAnswerIndex;
        const difficulty = question.difficulty;
        attemptedQ = new AttemptedQ({ userId, selectedAnswerIndex, questionId, isCorrect, difficulty });
        await attemptedQ.save();
        return res.status(200).send({
            questionId: attemptedQ.questionId,
            selectedAnswerIndex: attemptedQ.selectedAnswerIndex,
            isCorrect: attemptedQ.isCorrect,
            difficulty: attemptedQ.difficulty
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const all_attempted_questions = async (req, res) => {
    const userId = req.user._id;
    try {
        const allAttemptedQs = await AttemptedQ.find({ userId }).populate('userId', '-password');
        return res.status(200).send(allAttemptedQs);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { all_questions, attempted_question, all_attempted_questions, add_questions }