import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const SignUp = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [username,setUsername] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const handleSign = async () => {
        try {
            setLoading(true);
            if (!email || !password || !phone || !username) {
            alert("Data is not provided!!");
            setLoading(false);
            return;
            }
            const result = await axios.post("http://localhost:3000/cred/signup", {
            email, username, phone, password, role: "admin"
            });
            toast.success("Sign Up is done !!");
            localStorage.setItem("token", result.data.token);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
        <div className="max-w-md w-full bg-white px-8 py-6 rounded-xl shadow-md">
            <h1 className="font-thin text-4xl text-center mb-6">SIGN UP</h1>
            <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="username" className="font-thin">Enter Your UserName</label>
                <input
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="e.g john Cena"
                    required
                    className="px-2 font-thin py-2 outline-none border-0 border-b-2 border-gray-300 focus:border-[#00ED64] transition"
                />
            </div>
            <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="font-thin">Enter Your Email</label>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="abc12345"
                required
                className="px-2 font-thin py-2 outline-none border-0 border-b-2 border-gray-300 focus:border-[#00ED64] transition"
            />
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="phone" className="font-thin">Enter Your Phone</label>
                <input
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    type="text"
                    name="pphone"
                    id="phone"
                    placeholder="+91 12345"
                    required
                    className="px-2 font-thin py-2 outline-none border-0 border-b-2 border-gray-300 focus:border-[#00ED64] transition"
                />
            </div>

            <button className="py-2 bg-[#00ED64] border border-[#0C5822] hover:rounded-2xl w-full mb-4" disabled={loading}
            onClick={handleSign}>
            {loading ? "LOADING ...":"SIGNUP"}
            </button>

            <p className="text-sm font-thin">
            Already have an Account?{" "}
            <Link to="/login" className="underline text-green-700 font-bold">LOGIN</Link>
            </p>
        </div>
        </div>
    )

}

export default SignUp