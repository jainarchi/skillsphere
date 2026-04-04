import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider ,  } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";
import {router} from "./AppRouters";

const App = () => {
  return (
    <>
     <AuthProvider>
         <RouterProvider router={router} />
         
     </AuthProvider>



      <ToastContainer position="top-right" autoClose={2000} limit={1} />
    </>
  )
}

export default App
