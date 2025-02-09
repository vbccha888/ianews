const Article = require('../models/Article');

// Criar Artigo
const createArticle = async (req, res) => {
  const { title, content, category, tags, images, videos } = req.body;
  const article = await Article.create({
    title,
    content,
    author: req.user._id,
    category,
    tags,
    images,
    videos,
  });
  res.status(201).json(article);
};

// Listar Artigos
const getArticles = async (req, res) => {
  const articles = await Article.find().populate('author', 'name');
  res.json(articles);
};

// Atualizar Artigo
const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;
    article.category = req.body.category || article.category;
    article.tags = req.body.tags || article.tags;
    article.images = req.body.images || article.images;
    article.videos = req.body.videos || article.videos;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404).json({ message: 'Artigo não encontrado' });
  }
};

// Deletar Artigo
const deleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    await article.remove();
    res.json({ message: 'Artigo removido' });
  } else {
    res.status(404).json({ message: 'Artigo não encontrado' });
  }
};

module.exports = { createArticle, getArticles, updateArticle, deleteArticle };