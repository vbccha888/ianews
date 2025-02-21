import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/update-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setMessage(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("⚠️ Senha atual incorreta. Tente novamente."); // ✅ Exibe erro corretamente
        } else {
          setError(error.response.data.message || "Erro ao atualizar senha.");
        }
      } else {
        setError("Erro ao conectar com o servidor.");
      }
    }
  };

  if (!user) return <div className="text-center my-5">Carregando...</div>;

  return (
    <div className="container my-4">
      <h1>Meu Perfil</h1>
      <p>
        <strong>Nome:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Status:</strong> {user.isEditor ? "Editor" : "Usuário Comum"}
      </p>

      <hr />

      <h2>Alterar Senha</h2>

      {/* ✅ Mensagens de sucesso ou erro agora aparecem corretamente */}
      {message && <div className="alert alert-success text-center w-50">{message}</div>}
      {error && <div className="alert alert-danger text-center w-50">{error}</div>}

      <form onSubmit={handlePasswordChange} className="d-flex flex-column align-items-center mt-4">
        <div className="mb-3" style={{ width: "40%" }}>
          <label className="form-label fw-bold">Senha Atual</label>
          <input
            type="password"
            className="form-control p-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3" style={{ width: "40%" }}>
          <label className="form-label fw-bold">Nova Senha</label>
          <input
            type="password"
            className="form-control p-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2 px-4 py-2">
          Alterar Senha
        </button>
      </form>
    </div>
  );
};

export default Profile;


