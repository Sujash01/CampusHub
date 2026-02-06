import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://127.0.0.1:5000/auth/login", {
      email,
      password,
    });

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");
  };

  return (
    <div className="page-bg min-h-screen flex items-center justify-center">
      <div className="glass-elevated p-10 rounded-3xl w-[380px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-3 bg-black/40 rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-black/40 rounded-xl mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="btn-primary w-full">
          Login
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          New user? <Link to="/register" className="text-green-400">Register</Link>
        </p>
      </div>
    </div>
  );
}
