const { Router } = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const { user_profile } = require("../controllers/profileController");

const router = Router();

router.get('/profile', authenticateToken, user_profile)

module.exports = router;