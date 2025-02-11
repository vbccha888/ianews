import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ArticleCard from "../components/ArticleCard";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles`)
      .then(response => setArticles(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      {/* Carrossel Manual */}
      <div id="newsCarousel" className="carousel slide my-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active text-center p-5 bg-dark text-light">
            <h1>Bem-vindo ao TechNews!</h1>
            <p>Explore as últimas notícias e tendências em tecnologia.</p>
          </div>
          <div className="carousel-item text-center p-5 bg-secondary text-light">
            <h3>Inteligência Artificial</h3>
            <p>Descubra como a IA está transformando o mundo.</p>
          </div>
          <div className="carousel-item text-center p-5 bg-dark text-light">
            <h3>Inovações em Gadgets</h3>
            <p>Conheça os gadgets mais recentes do mercado.</p>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>

      {/* Últimas Notícias */}
      <h1 className="my-4">Últimas Notícias</h1>
      <Row>
        {articles.length > 0 ? (
          articles.map(article => (
            <Col key={article._id} md={4} className="mb-4">
              <ArticleCard article={article} />
            </Col>
          ))
        ) : (
          <p className="text-center">Nenhuma notícia encontrada.</p>
        )}
      </Row>
    </Container>
  );
};

export default Home;
