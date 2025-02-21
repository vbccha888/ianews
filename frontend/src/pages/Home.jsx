import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ArticleCard from "../components/ArticleCard";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles`)
      .then(response => setArticles(response.data))
      .catch(error => console.error("Erro ao buscar artigos:", error));

    axios.get(`${process.env.REACT_APP_API_URL}/articles/categories`)
      .then(response => {
        console.log("Categorias carregadas:", response.data); // Debug para verificar no console
        setCategories(response.data || []); // Garante que nunca seja undefined
      })
      .catch(error => console.error("Erro ao buscar categorias:", error));
  }, []);

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  return (
    <Container>
      {/* ✅ Menu de Categorias corrigido */}
      <div className="d-flex flex-wrap gap-2 my-3">
        <Button variant={selectedCategory === "" ? "dark" : "outline-dark"} onClick={() => setSelectedCategory("")}>
          Todas
        </Button>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "primary" : "outline-primary"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))
        ) : (
          <p className="text-muted">Nenhuma categoria disponível</p>
        )}
      </div>

      {/* Últimas Notícias */}
      <h1 className="my-4">Últimas Notícias</h1>
      <Row>
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <Col key={article._id} md={4} className="mb-4">
              <ArticleCard article={article} />
            </Col>
          ))
        ) : (
          <p className="text-center">Nenhuma notícia encontrada para esta categoria.</p>
        )}
      </Row>
    </Container>
  );
};

export default Home;


