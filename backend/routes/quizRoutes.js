const { Router } = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const { getQuizById, quizStart, quizSubmit, getQuizResult } = require("../controllers/quizController");

const router = Router();

router.get('/:quizId', authenticateToken, getQuizById)
router.post('/:quizId/start', authenticateToken, quizStart);
router.post('/:quizId/submit', authenticateToken, quizSubmit);
router.get('/:quizId/result', authenticateToken, getQuizResult);

module.exports = router;