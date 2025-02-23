import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge, Card } from "react-bootstrap";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!article) return <div className="text-center my-5">Carregando...</div>;

  const articleDate = new Date(article.createdAt);
  const today = new Date();
  const diffDays = Math.floor((today - articleDate) / (1000 * 60 * 60 * 24));

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu.be\/|youtube.com\/watch\?v=|youtube.com\/embed\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="container my-4">
      <div className="text-center">
        <h1 className="fw-bold">
          {article.title}{" "}
          {diffDays <= 1 && <Badge bg="danger">Nova!</Badge>} {/* ✅ Exibe o selo se for nova */}
        </h1>
        <p className="text-muted">
          Publicado em: {articleDate.toLocaleDateString("pt-BR", {
            day: "2-digit", month: "long", year: "numeric"
          })}
        </p>
        <hr className="w-50 mx-auto my-4" />
      </div>

      {article.images && article.images.length > 0 ? (
        <div className="text-center my-4">
          <img
            src={article.images[0]}
            alt={article.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", maxWidth: "90%", objectFit: "contain" }}
          />
        </div>
      ) : (
        <div className="text-center my-4">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Imagem não disponível"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", maxWidth: "90%", objectFit: "contain" }}
          />
        </div>
      )}

      <div className="lead text-justify" style={{ textAlign: "justify", lineHeight: "1.8", marginTop: "30px" }}>
        {article.content.split("\n").map((paragraph, index) => (
          <p key={index} style={{ marginBottom: "20px" }}>{paragraph}</p>
        ))}
      </div>

      {article.videos && article.videos.length > 0 && (
        <div className="text-center my-4">
          {article.videos.map((video, index) => (
            <div key={index} className="my-3">
              <iframe
                width="90%"
                height="300"
                src={getYouTubeEmbedUrl(video)}
                title={`Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-3">
        <button onClick={() => window.history.back()} className="btn btn-secondary px-3 py-2">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;

