const Result = require("../models/resultSchema");
const QuestionOption = require("../models/questionOptionSchema");
const Question = require("../models/questionSchema");
const Quiz = require("../models/quizSchema");
const UserAnswer = require("../models/userAnswersSchema");

//all_questions
const all_questions = async (req, res) => {
    try {
        const allQuestions = await Question.find({}).populate([{ path: 'options' }, { path: 'correct_option' }]);
        return res.status(200).send(allQuestions);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
//add_questions
const add_questions = async (req, res) => {
    const { quizId, questions } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        throw new Error('Quiz not found');
    }
    const questionIds = [];
    try {
        for (let q of questions) {
            const createdChoices = await Promise.all(q.options.map(async option => {
                const choice = new QuestionOption({ ...option });
                await choice.save();
                return choice._id;
            }));
            const correctChoiceId = createdChoices[q.options.findIndex(option => option.isCorrect)];
            const question = new Question({
                text: q.text,
                quizId: quizId,
                tag: q.tag,
                points: q.points,
                difficulty: q.difficulty,
                correct_option: correctChoiceId,
                options: createdChoices
            });
            const savedQuestion = await question.save();
            questionIds.push(savedQuestion._id);
            for (let choiceId of createdChoices) {
                await QuestionOption.findByIdAndUpdate(choiceId, { questionId: q._id });
            }
        }
        quiz.questions.push(...questionIds);
        await quiz.save();
        res.status(200).send('Questions and choices added successfully');
    } catch (error) {
        res.status(500).send('Error adding questions: ' + error.message);
    }
}
//user_answer
const user_answer = async (req, res) => {
    const userId = req.user._id;
    const { selectedOption, questionId } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).send('Question not found');
        const quiz = await Quiz.findById(question.quizId);
        if (!quiz) return res.status(400).send('Quiz not found')
        const result = await Result.findOne({ userId, quizId: quiz._id })
        if (!result) return res.status(400).send('Result not found!')
        let userAnswer = await UserAnswer.findOne({ questionId, userId, resultId: result._id });
        if (userAnswer) return res.status(400).send('Already Attempted Question')
        //save user answer
        const isCorrect = question.correct_option._id.toString() === selectedOption;
        userAnswer = new UserAnswer({ userId, selectedOption, questionId, isCorrect, resultId: result._id });
        const savedAnswer = await userAnswer.save();
        result.answers.push(savedAnswer._id);
        await result.save();
        return res.status(200).send(savedAnswer);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
// all_user_answers
const all_user_answers = async (req, res) => {
    const userId = req.user._id;
    // try {
    //     const allAttemptedQs = await AttemptedQ.find({ userId }).populate('userId', '-password');
    //     return res.status(200).send(allAttemptedQs);
    // } catch (error) {
    //     res.status(500).send(error.message)
    // }
}

module.exports = { all_questions, user_answer, all_user_answers, add_questions }