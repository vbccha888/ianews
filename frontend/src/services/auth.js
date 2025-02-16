export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const isEditor = () => {
  return localStorage.getItem("isEditor") === "true";
};

export const login = (token, isEditor) => {
  localStorage.setItem("token", token);
  localStorage.setItem("isEditor", isEditor);
  window.dispatchEvent(new Event("authChange")); // 🔄 Dispara evento para atualizar Navbar
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isEditor");
  window.dispatchEvent(new Event("authChange")); // 🔄 Dispara evento para atualizar Navbar
  window.location.href = "/login"; // Redireciona para login após logout
};

