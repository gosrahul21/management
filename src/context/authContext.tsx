import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext<{
  jwt: string | null;
  refreshToken: string | null;
  login: (code: string) => void;
  logout: () => void;
}>({
  jwt: "",
  refreshToken: "",
  login: (_) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("jwt"));
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!jwt) return navigate("/login");
    localStorage.setItem("jwt", jwt!);
    localStorage.setItem("refreshToken", refreshToken!);
    location.pathname === "/login" && navigate("/");
  }, [jwt, refreshToken]);

  const login = async (code: string) => {
    try {
      const response = await axios.post("http://localhost:3000/users", {
        code,
      });
      const { jwt, refreshToken } = response.data;
      setJwt(jwt);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const logout = () => {
    setJwt(null);
    setRefreshToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ jwt, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
