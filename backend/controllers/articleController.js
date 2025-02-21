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


// Listar Artigos (agora ordenados do mais novo para o mais antigo)
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name').sort({ createdAt: -1 }); // ✅ Ordenando
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar artigos", error: error.message });
  }
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
// Método DELETE (Deletar Artigo)
const deleteArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      
      if (!article) {
        return res.status(404).json({ message: 'Artigo não encontrado' });
      }
  
      // Substitua remove() por deleteOne()
      await article.deleteOne();
      
      res.json({ message: 'Artigo removido com sucesso' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao remover artigo',
        error: error.message
      });
    }
  };

  // ✅ Buscar artigo por ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name');
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Artigo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar artigo', error: error.message });
  }
};

// ✅ Obter todas as categorias únicas salvas no banco de dados
const getCategories = async (req, res) => {
  try {
    console.log("🔍 Iniciando busca de categorias...");

    // Busca apenas a categoria de todos os artigos, garantindo que _id não interfira
    const articles = await Article.find({}, { category: 1, _id: 0 }).lean(); 

    console.log("📊 Artigos encontrados no banco de dados:", articles);

    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Nenhuma categoria encontrada" });
    }

    // Captura apenas categorias válidas
    const allCategories = articles
      .map(article => article.category) // Pega apenas o campo "category"
      .filter(category => typeof category === "string" && category.trim() !== ""); // Remove valores inválidos

    console.log("✅ Categorias filtradas:", allCategories);

    const uniqueCategories = [...new Set(allCategories)]; // Remove duplicatas

    console.log("🏆 Categorias únicas:", uniqueCategories);

    res.json(uniqueCategories);
  } catch (error) {
    console.error("❌ Erro ao buscar categorias:", error);
    res.status(500).json({ message: "Erro ao buscar categorias", error: error.message });
  }
};









module.exports = { createArticle, getArticles, getArticleById, updateArticle, deleteArticle, getCategories };


