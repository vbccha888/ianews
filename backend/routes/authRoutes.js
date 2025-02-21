const express = require('express');
const { loginUser, registerUser, getUserProfile, updatePassword, updateProfile, deleteUser } = require('../controllers/authController');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/update-password", protect, updatePassword);
router.put("/update-profile", protect, updateProfile);
router.delete("/delete-account", protect, deleteUser); // ✅ Nova rota para exclusão

module.exports = router;


