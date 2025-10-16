import { useState, useEffect } from "react";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "authToken") {
        setIsLoggedIn(!!event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { isLoggedIn, login, logout };
}

export default useAuth;