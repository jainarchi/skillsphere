import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from 'lucide-react';
import { useAuth } from "../../hook/useAuth";


const Login = () => {
  const { handleLogin, loading } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }


  try {
     await handleLogin({ email, password }); 
     navigate("/");
    

  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed. Try again."
    );
  }
   
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center page-bg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
         <h1 className="text-2xl pb-4 text-center text-purple-600 font-bold">SkillSphere</h1>
        <h4 className=" font-semibold mb-6 text-center text-gray-500">WellCome Back </h4>

        {error && (
          <p className=" text-red-500 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="btn py-2.5"
              // disabled = {loading}
          >
            <LogIn className='icon' />
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
