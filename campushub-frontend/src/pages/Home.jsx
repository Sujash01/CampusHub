import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="page-bg">

      <section className="h-screen flex items-center justify-center text-center px-6">
        <div>
          <img src={logo} className="h-20 mx-auto mb-6" />

          <h1 className="text-6xl font-bold mb-6">
            Campus Life <span className="text-green-400">Simplified</span>
          </h1>

          <p className="text-gray-300 mb-10">
            Events, announcements & everything happening on campus.
          </p>

          <Link to="/login" className="btn-primary text-lg px-10 py-4">
            Enter CampusHub
          </Link>
        </div>
      </section>
    </div>
  );
}
