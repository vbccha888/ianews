# 📰 IAnews - Plataforma de Notícias

IAnews é uma aplicação full-stack para gerenciamento e exibição de artigos de notícias. O projeto é desenvolvido utilizando **React (Frontend), Node.js com Express (Backend) e MongoDB (Banco de Dados)**.

---

## 🚀 Tecnologias Utilizadas

### 📌 **Frontend (React)**
- **React.js** - Biblioteca para criação de interfaces.
- **React Router** - Gerenciamento de rotas no frontend.
- **Axios** - Para requisições HTTP ao backend.
- **Bootstrap** - Estilização rápida e responsiva.
- **React-Bootstrap** - Componentes prontos do Bootstrap para React.

### 📌 **Backend (Node.js + Express)**
- **Express.js** - Framework minimalista para Node.js.
- **MongoDB + Mongoose** - Banco de dados NoSQL para armazenar usuários e artigos.
- **JWT (Json Web Token)** - Autenticação segura de usuários.
- **Bcrypt.js** - Hashing de senhas para segurança.
- **Cors** - Permitir comunicação entre frontend e backend.
- **Dotenv** - Gerenciamento de variáveis de ambiente.
- **Multer** - Upload e manipulação de arquivos.

---

## 📂 Estrutura do Projeto

```
📦 meu-projeto
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 App.jsx
 ┃ ┃ ┣ 📜 index.jsx
 ┃ ┃ ┗ 📜 App.css
 ┃ ┣ 📜 package.json
 ┃ ┗ 📜 .env
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 db.js
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 middleware
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📜 server.js
 ┃ ┣ 📜 .env
 ┃ ┗ 📜 package.json
 ┗ 📜 README.md
```

---

## 🛠️ Como Rodar o Projeto

### 🔹 **Pré-requisitos**
Antes de começar, você precisa ter instalado:
- **[Node.js](https://nodejs.org/)** (versão recomendada: LTS)
- **[MongoDB](https://www.mongodb.com/)** (local ou via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **[Git](https://git-scm.com/)** (opcional, mas recomendado)

### 🔹 **1. Clonar o Repositório**

```bash
git clone https://github.com/seuusuario/IAnews.git
cd IAnews
```

### 🔹 **2. Configurar o Backend**

```bash
cd backend
npm install  # Instala todas as dependências
```

#### **Criar e configurar o arquivo `.env` no backend**
Crie um arquivo `.env` dentro da pasta `backend` e adicione:

```
PORT=5000
DB_CONNECTION_STRING=mongodb+srv://seu_usuario:senha@cluster.mongodb.net/dbname
JWT_SECRET=sua_chave_secreta
EDITOR_SECRET_CODE=codigoeditor
```

#### **Rodar o servidor backend**

```bash
npm start  # Ou npx nodemon server.js (para desenvolvimento)
```

O backend estará rodando em `http://localhost:5000`.

---

### 🔹 **3. Configurar o Frontend**

```bash
cd ../frontend
npm install  # Instala as dependências do React
```

#### **Criar e configurar o arquivo `.env` no frontend**
Crie um arquivo `.env` dentro da pasta `frontend` e adicione:

```
REACT_APP_API_URL=http://localhost:5000/api
```

#### **Rodar o frontend**

```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`.

---

## 🚀 Funcionalidades do Sistema

✅ Cadastro e Login de usuários com autenticação JWT.  
✅ Dashboard para gerenciamento de artigos (somente para editores).  
✅ Listagem de artigos na página inicial.  
✅ Detalhamento de um artigo com imagens e vídeos.  
✅ Criação, edição e remoção de artigos (somente para editores).  

---

## 🎯 Melhorias Futuras
- Implementação de um sistema de comentários.
- Suporte a categorias e tags avançadas.
- Upload de imagens e vídeos diretamente para um serviço de armazenamento (AWS S3, Cloudinary, etc.).

---

## 📌 Contribuindo
Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch com sua funcionalidade (`git checkout -b minha-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça um push para a branch (`git push origin minha-feature`).
5. Abra um **Pull Request**.

---

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo. 😊

