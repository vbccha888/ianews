const express = require('express');
const { loginUser, registerUser, getUserProfile, updatePassword, updateProfile } = require('../controllers/authController');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/update-password", protect, updatePassword);
router.put("/update-profile", protect, updateProfile); // ✅ Nova rota

module.exports = router;

