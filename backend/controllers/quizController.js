const Result = require("../models/ResultSchema");
const Quiz = require("../models/quizSchema");

const getQuizById = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId).populate({
            path: "questions",
            populate: [{ path: "options" }, { path: "correct_option" }]
        }).populate('createdBy')
        if (!quiz) {
            return res.status(400).send("Quiz not found")
        }
        return res.status(200).send(quiz);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error')
    }
}

const quizStart = async (req, res) => {
    const { quizId } = req.params;
    const { _id: userId } = req.user;
    try {
        let result = await Result.findOne({ userId, quizId })
        if (!result) {
            result = new Result({ userId, quizId });
            const savedResult = await result.save();
            const populatedResult = await Result.populate(savedResult, { path: 'answers' })
            return res.status(200).send(populatedResult);
        } else {
            const populatedResult = await Result.populate(result, { path: 'answers' })
            return res.status(200).send(populatedResult)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error')
    }
}

const quizSubmit = async (req, res) => {
    const userId = req.user._id;
    const { quizId } = req.params;
    const { totalScore, userScore, percentage } = req.body;
    try {
        const result = await Result.findOne({ quizId, userId })
        if (!result) return res.status(400).send('Result not found')
        result.totalScore = totalScore;
        result.userScore = userScore;
        result.percentage = percentage;
        await result.save();
        return res.status(200).send('Result submitted successfully')
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error')
    }
}

const getQuizResult = async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user._id;
    try {
        const result = await Result.findOne({ quizId, userId }).populate('answers').populate('userId')
            .populate('quizId');
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error')
    }
}
module.exports = { getQuizById, quizStart, quizSubmit, getQuizResult }