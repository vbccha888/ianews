const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite JSON no body das requisições

// Rotas
app.use("/api/articles", articleRoutes); // ✅ Agora todas as rotas de artigos estarão em /api/articles
app.use("/api/auth", authRoutes); // ✅ Rotas de autenticação

// Rota de teste para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.send("API está rodando...");
});

// Tratamento de erro para rotas inexistentes
app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
