import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Importamos Link
import axios from "axios";
import { isAuthenticated, login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });

      login(response.data.token, response.data.isEditor);

      navigate("/profile");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="container my-4">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>

      <p className="mt-3">
        Ainda não tem uma conta? <Link to="/register">Crie uma aqui</Link> {/* ✅ Novo link */}
      </p>
    </div>
  );
};

export default Login;

