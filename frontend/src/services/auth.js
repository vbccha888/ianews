export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  
  export const isEditor = () => {
    return localStorage.getItem("isEditor") === "true";
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isEditor");
    window.location.href = "/login";
  };