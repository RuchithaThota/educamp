const { Router } = require("express");
const { all_questions, attempted_question, all_attempted_questions, add_questions } = require("../controllers/questionController");
const authenticateToken = require("../middleware/authenticateToken");

const router = Router();

router.route('/all').get(authenticateToken, all_questions);
router.route('/add').get(authenticateToken, add_questions);
router.post('/attempted', authenticateToken, attempted_question);
router.get('/attempted/all', authenticateToken, all_attempted_questions)

module.exports = router;