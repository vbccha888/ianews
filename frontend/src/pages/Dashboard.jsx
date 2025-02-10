import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => setArticles(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/articles/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(() => setArticles(articles.filter(article => article._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <h1 className="my-4">Dashboard Editorial</h1>
      <Button onClick={() => navigate("/dashboard/new")} className="mb-4">Criar Novo Artigo</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>
                <Button onClick={() => navigate(`/dashboard/edit/${article._id}`)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(article._id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;