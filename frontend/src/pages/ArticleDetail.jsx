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

  const hasImages = article.images?.some(image => image);
  const hasVideos = article.videos?.length > 0;

  return (
    <div className="container my-4">
      {/* Renderiza imagens somente se existirem */}
      {hasImages && (
        <div className="text-center mb-4">
          {article.images
            .filter(image => image) 
            .map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Imagem ${index + 1}`} 
                className="rounded shadow-sm mb-4"
                style={{ maxWidth: "60%", height: "auto" }}
              />
          ))}
        </div>
      )}
      
      {/* Título e Conteúdo */}
      <div className="text-center">
        <h1 className="fw-bold">{article.title}</h1>
        <hr className="w-50 mx-auto my-4" />
      </div>

      <p className="lead text-justify" style={{ textAlign: "justify", lineHeight: "1.8", marginTop: "30px" }}>{article.content}</p>
      
      {/* Renderiza vídeos somente se existirem */}
      {hasVideos && (
        <div className="text-center mt-4">
          {article.videos.map((video, index) => (
            <div key={index} className="mb-2">
              <iframe
                src={video}
                title={`Vídeo ${index + 1}`}
                className="rounded shadow-sm"
                width="100%"
                height="auto"
                style={{ minHeight: "200px", maxHeight: "350px" }}
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}

      {/* Botão de Voltar */}
      <div className="text-center mt-3">
        <button onClick={() => window.history.back()} className="btn btn-secondary px-3 py-2">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
