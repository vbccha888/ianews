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
      <h1 className="my-4">Últimas Notícias</h1>
      <Row>
        {articles.map(article => (
          <Col key={article._id} md={4} className="mb-4">
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;