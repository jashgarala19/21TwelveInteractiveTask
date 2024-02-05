import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);

  const setUserToken = (newToken, user) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(newToken);
    // axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const user = localStorage.getItem("user");

  // useEffect(() => {
  //   console.log('Called ');

  //   if (storedToken) {
  //     // Initialize Axios headers with the stored token on page load
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
  //   }
  // }, []);

  const logOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  const contextValue = useMemo(
    () => ({
      token,
      setUserToken,
      user: JSON.parse(user),
      logOut,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
