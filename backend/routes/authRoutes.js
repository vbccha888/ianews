const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();
const { getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;