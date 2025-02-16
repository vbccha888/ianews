import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [navigate]);

  if (!user) return <div className="text-center my-5">Carregando...</div>;

  return (
    <div className="container my-4">
      <h1>Meu Perfil</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.isEditor ? "Editor" : "Usuário Comum"}</p> {/* ✅ Agora mostra o status */}
    </div>
  );
};

export default Profile;
