import React, { createContext, useEffect, useState } from "react";
import http from "../../utils/http";
import setAuthToken from "../../utils/setAuthToken"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      http
        .get("/user")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          setToken(null);
          localStorage.removeItem("token");
          console.log(err);
          setAuthToken(null);
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await http.post("/auth", { email, password });
    setToken(res.data);
    localStorage.setItem("token", res.data);
    console.log("Token", res.data);
    setAuthToken(res.data);
    const userResponse = await http.get("/user");
    console.log("User", userResponse.data);
    setUser(userResponse.data);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;