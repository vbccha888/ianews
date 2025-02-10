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

  if (!article) return <div>Carregando...</div>;

  return (
    <div className="container my-4">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      {article.images.map((image, index) => (
        <img key={index} src={image} alt={`Imagem ${index + 1}`} className="img-fluid mb-3" />
      ))}
      {article.videos.map((video, index) => (
        <iframe key={index} src={video} title={`Vídeo ${index + 1}`} className="mb-3" width="100%" height="315" />
      ))}
    </div>
  );
};

export default ArticleDetail;