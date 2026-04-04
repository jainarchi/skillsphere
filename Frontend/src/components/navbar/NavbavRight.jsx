import { LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from '../../hook/useAuth';


const NavbarRight = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {handleLogout} = useAuth()

  const logoutUser = async() => {
    await handleLogout()
    navigate("/");
  };

  const handleNotes = () =>{
     navigate( user ? '/notes' : '/login')
  }



  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <button
        className="nav-btn  "
        onClick={() => navigate('/')}
      >
        Home
      </button>

      <button
        className="nav-btn  "
        onClick={handleNotes}
      >
        Notes
      </button>


      {!user ? (
        <>
          <button
            className="nav-btn"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </>
      ) : (
        <>

          <button
            className="nav-btn"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>

          <button
            className="nav-btn  flex items-center "
            onClick={logoutUser}
          >
            Logout <LogOut className="h-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default NavbarRight;
