import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Verifica autenticação ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token encontrado:", token); // 🔴 Debug para ver se há um token salvo
    setIsLoggedIn(token !== null); // Converte para booleano corretamente
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isEditor", response.data.isEditor);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="container my-4">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary w-100">Entrar</button>

        {/* 🔹 O botão "Criar Conta" agora sempre será renderizado corretamente */}
        {!isLoggedIn && (
          <div className="text-center mt-3">
            <p>Não tem uma conta?</p>
            <Link to="/register" class position-absolute top-0 end-0 text-primary fw-bold className="btn btn-success w-100" id="register-btn">Criar Conta</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;





