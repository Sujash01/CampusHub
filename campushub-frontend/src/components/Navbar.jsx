import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setScrolled(window.scrollY > 40)
    );
  }, []);

  if (["/login", "/register"].includes(location.pathname)) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all
      ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-9" />
          <span className="text-green-400 font-bold">CampusHub</span>
        </Link>

        <div className="flex gap-8 text-gray-300 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/events">Events</Link>
          <Link to="/announcements">Announcements</Link>

          {user && (
            <button
              className="btn-secondary"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
