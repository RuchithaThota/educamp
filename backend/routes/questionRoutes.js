const { Router } = require("express");
const { all_questions, add_questions, user_answer, all_user_answers } = require("../controllers/questionController");
const authenticateToken = require("../middleware/authenticateToken");

const router = Router();

router.route('/all').get(authenticateToken, all_questions);
router.route('/add').get(authenticateToken, add_questions);
router.post('/user-answer', authenticateToken, user_answer);
router.get('/user-answer/all', authenticateToken, all_user_answers);

module.exports = router;