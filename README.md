📰 Technews - Plataforma de Notícias

Technews é uma plataforma moderna para gestão e exibição de artigos de notícias. O projeto utiliza React.js para o frontend e Node.js com Express para o backend, com um banco de dados MongoDB.

🚀 Tecnologias Utilizadas

🔹 Frontend (React.js)
React.js - Biblioteca para interfaces dinâmicas.
React Router - Gerenciamento de rotas.
Axios - Requisições HTTP.
Bootstrap & React-Bootstrap - Estilização responsiva.

🔹 Backend (Node.js + Express.js)
Express.js - Framework web.
MongoDB + Mongoose - Banco de dados NoSQL.
JWT (Json Web Token) - Autenticação segura.
Bcrypt.js - Hashing de senhas.
Cors - Permissão de comunicação entre domínios.
Dotenv - Gerenciamento de variáveis de ambiente.
---

## 📂 Estrutura do Projeto

IAnews/
├── backend/
│   ├── config/ (Conexão com o MongoDB)
│   ├── controllers/ (Lógica de controle do backend)
│   ├── middleware/ (Middlewares de autenticação e controle de acesso)
│   ├── models/ (Modelos de dados para MongoDB)
│   ├── routes/ (Definição das rotas da API)
│   ├── server.js (Configuração principal do backend)
│   ├── .env (Variáveis de ambiente do backend)
│   ├── package.json (Dependências do backend)
│   ├── utils (gerenciamento de tokes de acesso em JWT)
│
├── frontend/
│   ├── src/
│   │   ├── components/ (Componentes reutilizáveis como Navbar e Footer)
│   │   ├── pages/ (Páginas principais como Home, Login, Dashboard)
│   │   ├── services/ (Serviços auxiliares como autenticação e API requests)
│   │   ├── App.jsx (Componente raiz da aplicação)
│   │   ├── index.jsx (Ponto de entrada do React)
│   │   ├── App.css (Estilização global da aplicação)
│   ├── public/ (Arquivos públicos como index.html e manifest.json)
│   ├── package.json (Dependências do frontend)
│   ├── .env (Variáveis de ambiente do frontend)
│
├── .gitignore (Arquivos ignorados pelo Git)
├── README.md

---

## 🛠️ Como Rodar o Projeto

### 🔹 **Pré-requisitos**
Antes de começar, você precisa ter instalado:
- **[Node.js](https://nodejs.org/)** (versão recomendada: LTS)
- **[MongoDB](https://www.mongodb.com/)** (local ou via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **[Git](https://git-scm.com/)** (opcional, mas recomendado)

### 🔹 1. Clonar o Repositório
git clone https://github.com/seuusuário/ianews.git
cd IAnews

###  2. Configurar o Backend
cd backend
npm install  # Instalar dependências

Criar um arquivo .env na pasta backend:
PORT=5000
DB_CONNECTION_STRING=mongodb+srv://usuario:senha@cluster.mongodb.net/IAnews
JWT_SECRET=chave_super_secreta
EDITOR_SECRET_CODE=codigoeditor

Executar o backend:
npm run dev

O backend estará rodando em http://localhost:5000.

### 3. Configurar o Frontend
cd ../frontend
npm install  # Instalar dependências

Criar um arquivo .env na pasta frontend:
REACT_APP_API_URL=http://localhost:5000/api

Executar o frontend:
npm start

##
🚀 Funcionalidades Principais

✅ Autenticação JWT - Login e registro de usuários.
✅ Dashboard - Gerenciamento de artigos (somente para editores).
✅ Exibição de Notícias - Listagem e visualização detalhada.
✅ CRUD de Artigos - Criar, editar e excluir artigos.

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo. 😊

