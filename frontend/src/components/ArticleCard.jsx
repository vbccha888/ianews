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

      <Card.Body style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
          {article.title}
        </Card.Title>
        <small className="text-muted">
          Publicado em: {articleDate.toLocaleDateString("pt-BR", {
            day: "2-digit", month: "long", year: "numeric"
          })}
        </small>
        <Card.Text style={{ flexGrow: 1, marginTop: "10px" }}>
          {article.content.substring(0, 200)}...
        </Card.Text>
        <Link to={`/article/${article._id}`} className="mt-auto">
          <Button variant="primary">Ler Mais</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
