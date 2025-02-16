import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Card style={{ height: "500px", display: "flex", flexDirection: "column", textAlign: "justify" }}>
      {/* Exibe a primeira imagem, se existir */}
      {article.images && article.images.length > 0 ? (
        <Card.Img
          variant="top"
          src={article.images[0]} // Mostra a primeira imagem
          alt={article.title}
          style={{ height: "180px", objectFit: "cover" }} // Ajusta a imagem ao card
        />
      ) : (
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/300x180" // Placeholder caso não tenha imagem
          alt="Imagem não disponível"
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <Card.Body style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>{article.title}
        </Card.Title>
        <Card.Text style={{ flexGrow: 1 }}>{article.content.substring(0, 200)}...</Card.Text>
        <Link to={`/article/${article._id}`} className="mt-auto">
          <Button variant="primary">Ler Mais</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;