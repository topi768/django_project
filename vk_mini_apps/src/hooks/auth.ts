import { useState, useEffect } from "react";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("access_token", authToken);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {
    authToken,
    login,
    logout,
  };
};
