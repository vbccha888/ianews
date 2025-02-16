export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Retorna true se houver um token salvo no localStorage
};

export const isEditor = () => {
  return localStorage.getItem("isEditor") === "true"; 
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isEditor");
  window.location.href = "/login"; // Redireciona para o login após logout
};

