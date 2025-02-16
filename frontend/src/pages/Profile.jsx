import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(response => setUser(response.data))
    .catch(error => console.error(error));
  }, []);

  const handleChangePassword = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/update-password`, { newPassword }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Senha alterada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="container my-4">
      <h1>Perfil</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div className="mb-3">
        <label className="form-label">Nova Senha</label>
        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleChangePassword}>Alterar Senha</button>
    </div>
  );
};

export default Profile;
