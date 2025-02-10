# IAnews - Backend

Este é o backend do site de notícias IAnews, desenvolvido com Node.js, Express e MongoDB.

## Funcionalidades
- Autenticação de usuários (login e registro).
- CRUD completo de artigos (apenas para editores).
- Armazenamento de artigos com título, conteúdo, autor, categoria, tags, imagens e vídeos.

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)

## Como Executar
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Configure o arquivo `.env` com as variáveis de ambiente:
  cd ianews/backend
  npm run dev



# IAnews - Frontend

Este é o frontend do site de notícias **IAnews**, desenvolvido com React, Bootstrap e React Router. Ele permite a navegação entre artigos e o acesso à área editorial para usuários autorizados.

## Funcionalidades
- **Página Inicial**: Listagem resumida de artigos.
- **Página de Detalhes**: Exibe o conteúdo completo de um artigo.
- **Área Editorial**: CRUD de artigos (apenas para editores).
- **Autenticação**: Login e registro de usuários.

## Tecnologias
- React
- React Router
- Bootstrap
- Axios (para chamadas à API)

## Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ianews.git
   cd ianews/frontend