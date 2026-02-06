import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://127.0.0.1:5000/auth/signup", {
      name,
      email,
      password,
    });

    navigate("/login");
  };

  return (
    <div className="page-bg min-h-screen flex items-center justify-center">
      <div className="glass-elevated p-10 rounded-3xl w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input className="w-full p-3 bg-black/40 rounded-xl mb-4" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input className="w-full p-3 bg-black/40 rounded-xl mb-4" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-3 bg-black/40 rounded-xl mb-6" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={register} className="btn-primary w-full">
          Create Account
        </button>
      </div>
    </div>
  );
}
