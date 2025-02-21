import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const formattedDate = new Date(article.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Card style={{ height: "500px", display: "flex", flexDirection: "column", textAlign: "justify" }}>
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
        <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>{article.title}</Card.Title>
        <small className="text-muted">Publicado em: {formattedDate}</small> {/* ✅ Adicionando a data aqui */}
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
