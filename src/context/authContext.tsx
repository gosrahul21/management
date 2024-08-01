import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const AuthContext = createContext<{
  jwt: string | null;
  refreshToken: string | null;
  login: (data: { code?: string; email?: string; password?: string }) => void;
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

  const login = async ({
    code,
    email,
    password,
  }: {
    code?: string;
    email?: string;
    password?: string;
  }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/users",
        {
          code,
          email,
          password,
        }
      );
      const { jwtToken, refreshToken } = response.data;
      setJwt(jwtToken);
      setRefreshToken(refreshToken);
      enqueueSnackbar("Login Successfull", { variant: "success" });
    } catch (error) {
      console.error("Error during login", error);
      enqueueSnackbar("Login failed", { variant: "error" });
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
