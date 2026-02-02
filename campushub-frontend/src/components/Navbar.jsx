import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦎</span>
          <span className="text-xl font-bold text-green-400">
            CampusHub
          </span>
        </div>

        <div className="flex gap-8 text-gray-300 font-medium">
          <Link className="hover:text-green-400 transition" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-green-400 transition" to="/events">Events</Link>
          <Link className="hover:text-green-400 transition" to="/announcements">Announcements</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-green-400 capitalize">{user?.role}</p>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="rounded-full px-4 py-1.5 bg-green-500 text-black font-semibold hover:bg-green-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
