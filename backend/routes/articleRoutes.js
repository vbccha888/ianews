const express = require('express');
const { protect, isEditor } = require('../middleware/authMiddleware');
const {
  createArticle,
  getArticles,
  getArticleById, // ✅ Importar o novo controlador
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(protect, isEditor, createArticle);

// ✅ Adicione a rota GET para buscar um artigo pelo ID
router
  .route('/:id')
  .get(getArticleById) // Nova rota GET
  .put(protect, isEditor, updateArticle)
  .delete(protect, isEditor, deleteArticle);

module.exports = router;
