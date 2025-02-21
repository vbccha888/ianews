import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`)
      .then(response => setArticle(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!article) return <div className="text-center my-5">Carregando...</div>;

  const formattedDate = new Date(article.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container my-4">
      <div className="text-center">
        <h1 className="fw-bold">{article.title}</h1>
        <p className="text-muted">Publicado em: {formattedDate}</p> {/* ✅ Adicionando a data aqui */}
        <hr className="w-50 mx-auto my-4" />
      </div>

      <p className="lead text-justify" style={{ textAlign: "justify", lineHeight: "1.8", marginTop: "30px" }}>
        {article.content}
      </p>

      <div className="text-center mt-3">
        <button onClick={() => window.history.back()} className="btn btn-secondary px-3 py-2">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
