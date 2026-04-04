import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validator/authValidator.js"

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });



  const onSubmit = async (data) => {
  
    try {
      await handleRegister(data);
      navigate("/");
    } catch (err) {
      console.log(err.response)
        setError("root", 
          { message: err.response?.data?.message || "Registration failed" });
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center page-bg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl pb-4 text-center text-purple-600 font-bold">
          SkillSphere
        </h1>

        <p  className="font-semibold mb-6 text-center text-gray-500">Start your journey to become a tech master!</p>

        {errors.root && (
          <p className="text-red-500 text-sm text-center mb-2">{errors.root.message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              placeholder="John Doe"
              {...register("name")}
              className="w-full border rounded px-3 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              placeholder="you@example.com"
              {...register("email")}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              placeholder="Create a password"
              type="password"
              {...register("password")}
              className="w-full border rounded px-3 py-2"
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
            className="btn py-2.5"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;