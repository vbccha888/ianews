import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css"; // ✅ Importamos o CSS

const ArticleCard = ({ article }) => {
  const articleDate = new Date(article.createdAt);
  const today = new Date();
  const diffDays = Math.floor((today - articleDate) / (1000 * 60 * 60 * 24));

  return (
    <Card style={{ height: "500px", display: "flex", flexDirection: "column", textAlign: "justify", position: "relative" }}>
      {diffDays <= 1 && <div className="ribbon">Nova!</div>} {/* ✅ Adicionando o selo transversal */}
      
      {article.images && article.images.length > 0 ? (
        <Card.Img
          variant="top"
          src={article.images[0]}
          alt={article.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/300x180"
          alt="Imagem não disponível"
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}

<Card.Body>
  <Card.Title>{article.title}</Card.Title>
  <small className="text-muted">
    Publicado em: {new Date(article.createdAt).toLocaleDateString("pt-BR")}
  </small>
  <Card.Text>{article.content.substring(0, 200)}...</Card.Text>
  
  {/* Exibir Tags da Notícia */}
  <div className="mt-2">
    {article.tags.map((tag, index) => (
      <span key={index} className="badge bg-secondary me-1">{tag}</span>
    ))}
  </div>

  <Link to={`/article/${article._id}`}>
    <Button variant="primary" className="mt-2">Ler Mais</Button>
  </Link>
</Card.Body>

    </Card>
  );
};

export default ArticleCard;
