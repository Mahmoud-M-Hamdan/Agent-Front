import { createContext, Provider, useState } from "react";

export const AuthContext = createContext({
  userId:'',
  token:'',
  isLoggin: false,
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userId", userData.user._id);
    setToken(userData.token);
    setUserId(userData.user._id);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  const isLoggin = !!token;

  const value = { login, logout, isLoggin, userId ,token};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
