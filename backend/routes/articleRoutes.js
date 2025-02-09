const express = require('express');
const { protect, isEditor } = require('../middleware/authMiddleware');
const {
  createArticle,
  getArticles,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const router = express.Router();

router.route('/').get(getArticles).post(protect, isEditor, createArticle);
router
  .route('/:id')
  .put(protect, isEditor, updateArticle)
  .delete(protect, isEditor, deleteArticle);

module.exports = router;