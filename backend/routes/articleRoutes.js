const express = require("express");
const { protect, isEditor } = require("../middleware/authMiddleware");
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getCategories,
} = require("../controllers/articleController");

const router = express.Router();

// ✅ Rota para obter todas as categorias DEVE VIR ANTES da rota de ID
router.get("/categories", getCategories); // 🔥 MOVIDO PARA CIMA

// ✅ Rota para obter todos os artigos e criar um novo artigo (somente para editores)
router.route("/")
  .get(getArticles)
  .post(protect, isEditor, createArticle);

// ✅ Rota para buscar, atualizar ou deletar um artigo pelo ID
router.route("/:id")
  .get(getArticleById)
  .put(protect, isEditor, updateArticle)
  .delete(protect, isEditor, deleteArticle);

module.exports = router;
