import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
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
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        setError("Erro ao carregar perfil.");
      });
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/update-profile`,
        { name, email },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setMessage("Perfil atualizado com sucesso!");
      setUser({ ...user, name, email });
      setEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao atualizar perfil.");
    }
  };

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

      setMessage("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("⚠️ Senha atual incorreta. Tente novamente.");
        } else {
          setError(error.response.data.message || "Erro ao atualizar senha.");
        }
      } else {
        setError("Erro ao conectar com o servidor.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/auth/delete-account`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("isEditor");
      alert("Conta excluída com sucesso!");
      window.location.href = "/login";
    } catch (error) {
      alert("Erro ao excluir conta. Tente novamente.");
    }
  };

  if (!user) return <div className="text-center my-5">Carregando perfil...</div>;

  return (
    <div className="container my-4">
      <h1>Meu Perfil</h1>

      {message && <div className="alert alert-success text-center w-50">{message}</div>}
      {error && <div className="alert alert-danger text-center w-50">{error}</div>}

      {/* Exibe os dados do perfil normalmente */}
      {!editing ? (
        <div>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.isEditor ? "Editor" : "Usuário Comum"}</p>
          <button className="btn btn-warning mt-2" onClick={() => setEditing(true)}>Editar Perfil</button>
        </div>
      ) : (
        <form onSubmit={handleProfileUpdate} className="d-flex flex-column align-items-center mt-4">
          <div className="mb-3" style={{ width: "40%" }}>
            <label className="form-label fw-bold">Nome</label>
            <input
              type="text"
              className="form-control p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{ width: "40%" }}>
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary mt-2 px-4 py-2">Salvar</button>
            <button type="button" className="btn btn-secondary mt-2 px-4 py-2" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </form>
      )}

      <hr />

      <h2>Alterar Senha</h2>
<form onSubmit={handlePasswordChange} className="mt-4" style={{ maxWidth: "400px" }}>
  <div className="mb-3">
    <label className="form-label fw-bold">Senha Atual</label>
    <input
      type="password"
      className="form-control p-2"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label fw-bold">Nova Senha</label>
    <input
      type="password"
      className="form-control p-2"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />
  </div>
  <button type="submit" className="btn btn-primary px-4 py-2">
    Alterar Senha
  </button>
</form>


      <hr />

      <h2 className="text-danger">Excluir Conta</h2>
      <p className="text-muted">Se você excluir sua conta, todos os seus dados serão removidos permanentemente.</p>
      <button className="btn btn-danger mt-2 px-4 py-2" onClick={handleDeleteAccount}>
        Excluir Conta
      </button>
    </div>
  );
};

export default Profile;



