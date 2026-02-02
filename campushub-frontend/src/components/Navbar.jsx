import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-green-400"
        >
          CampusHub
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/events" className="hover:text-green-400">
            Events
          </Link>
          <Link to="/announcements" className="hover:text-green-400">
            Announcements
          </Link>

          <span className="text-gray-400">{user?.name}</span>

          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
