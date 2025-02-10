import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.content.substring(0, 100)}...</Card.Text>
        <Link to={`/article/${article._id}`}>
          <Button variant="primary">Ler Mais</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;