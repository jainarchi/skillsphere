import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../hook/useAuth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authValidation.js"

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // backend error ke liye
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await handleLogin(data);
      navigate("/");
    } catch (err) {
      setError("root", {
        message: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center page-bg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl pb-4 text-center text-purple-600 font-bold">
          SkillSphere
        </h1>
        <h4 className="font-semibold mb-6 text-center text-gray-500">
          Welcome Back
        </h4>

        {/* Backend / global error */}
        {errors.root && (
          <p className="text-red-500 text-center mb-4">
            {errors.root.message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full border rounded px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full border rounded px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn py-2.5 flex items-center justify-center gap-2"
          >
            <LogIn className="icon" />
            {loading ? "Logging in..." : "Login"}
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