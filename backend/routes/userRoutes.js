const express = require('express');
const { protect, isEditor } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').get(protect, isEditor, getUsers);
router.route('/:id').delete(protect, isEditor, deleteUser);

module.exports = router;