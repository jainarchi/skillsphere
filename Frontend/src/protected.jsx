import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";



const Protected  = () =>{
    const {user , loading} = useContext(AuthContext)


    if(! user && !loading){
       return <Navigate to='/login' replace  />
    }
   

    if(user){
    return <Outlet />
}
}


export default Protected