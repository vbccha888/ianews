import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [error, setError] = useState(""); // Novo estado para erros
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reseta erro antes da nova tentativa
  
    const userData = {
      name,
      email,
      password,
    };
  
    // Só adiciona `editorCode` se o usuário inseriu algo
    if (editorCode.trim() !== "") {
      userData.editorCode = editorCode;
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData);
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isEditor", response.data.isEditor);
  
      navigate("/profile"); // ✅ Agora redireciona para o perfil
  
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao registrar usuário. Tente novamente.");
      }
    }
  };
  

  return (
    <div className="container my-4">
      <h1>Registro</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Exibe erro */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editorCode" className="form-label">Código de Editor (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="editorCode"
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;

