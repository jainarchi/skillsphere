import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { register, login, getMe, logout } from "../services/auth.api";




export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    const data = await register({ name, email, password });
    setUser(data.user);
    setLoading(false);
  };

  

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const data = await login({ email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleGetMe = async () => {
    setLoading(true);
    const data = await getMe();
    setUser(data?.user);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    console.log("logged out");
    setLoading(false);
  };


  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
