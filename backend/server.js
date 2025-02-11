const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Importação do CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes'); // Adicionado

dotenv.config();
connectDB();

const app = express();

// ✅ Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas o frontend React acessar
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite esses métodos HTTP
  credentials: true // Permite o uso de cookies e headers de autorização
}));

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes); // Adicionado

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
