import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(name, email, password);
      navigate("/");
    } catch (err) {
      setError("User already exists or invalid input");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f)",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <form
        onSubmit={handleRegister}
        className="relative bg-white/5 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-[420px] border border-white/10"
      >
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          Join CampusHub
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          className="w-full bg-black/40 p-3 mb-4 rounded-full text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full bg-black/40 p-3 mb-4 rounded-full text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full bg-black/40 p-3 mb-6 rounded-full text-white border border-white/10 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-full bg-green-500 text-black py-3 font-bold hover:bg-green-400 transition">
          Create Account
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already registered?{" "}
          <Link
            to="/"
            className="text-green-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
