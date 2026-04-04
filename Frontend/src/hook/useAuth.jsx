import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { register, login, getMe, logout } from "../services/auth.api";




export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ name, email, password }) => {

    try{
       setLoading(true);
    const data = await register({ name, email, password });
    setUser(data.user);

    }catch(err){
      console.log('register err' , err)
    }finally{
       setLoading(false);
    }
   
   
  };

  

  const handleLogin = async ({ email, password }) => {

    try{
     setLoading(true);
     const data = await login({ email, password });
     setUser(data.user);

    }
    catch(err){
      console.log("login err" , err )
      throw err ;
    } 
    finally{
       setLoading(false);
    }
  
    
  };


const handleGetMe = async () => {
  try {
    setLoading(true);

    const data = await getMe();

    if (data?.user) {
      setUser(data.user);
    } else {
      setUser(null);
    }

  } catch (err) {
    console.error("GetMe Error:", err);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {

    try{
      setLoading(true);
      await logout();
      setUser(null);
      console.log("logged out");

    }catch(err){
      console.log("logout err" , err)
    }
    finally{
        setLoading(false);
    }
  }


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
