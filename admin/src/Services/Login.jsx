import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        alert("You must fill those boxes!!");
        setLoading(false);
        return;
      }

      const result = await axios.post("http://localhost:3000/cred/login", {
        email,
        password
      });

      console.log(result.data.user);
      localStorage.setItem("token", result.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white px-8 py-6 rounded-xl shadow-md">
        <h1 className="font-thin text-4xl text-center mb-6">LOGIN</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="font-thin">Enter Your Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="abc@gmail.com"
            required
            className="px-2 font-thin py-2 outline-none border-0 border-b-2 border-gray-300 focus:border-[#00ED64] transition"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="font-thin">Enter Your Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="abc12345"
            required
            className="px-2 font-thin py-2 outline-none border-0 border-b-2 border-gray-300 focus:border-[#00ED64] transition"
          />
        </div>

        <button
          className="py-2 bg-[#00ED64] border border-[#0C5822] hover:rounded-2xl w-full mb-4"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "LOADING ..." : "LOGIN"}
        </button>

        <p className="text-sm font-thin">
          Don't have an Account?{" "}
          <Link to="/signup" className="underline text-green-700 font-bold">SIGNUP</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
