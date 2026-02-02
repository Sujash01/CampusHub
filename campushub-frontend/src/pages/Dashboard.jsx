import Layout from "../components/Layout";
import CampusPulse from "../components/CampusPulse";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <div
        className="relative rounded-3xl overflow-hidden mb-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

        <div className="relative p-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-300">
            Here’s what’s happening on campus today.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Stat title="Total Events" value={stats?.events ?? "—"} />
        <Stat title="Open Events" value={stats?.open_events ?? "—"} />
        <Stat title="Announcements" value={stats?.announcements ?? "—"} />
      </div>

      {/* PULSE + UPCOMING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <CampusPulse
          items={[
            {
              type: "announcement",
              title: "Mid-semester exams announced",
              description:
                "Exams will begin from 18th March. Timetable coming soon.",
              time: "2h ago",
            },
            {
              type: "event",
              title: "Tech Fest registrations open",
              description:
                "Hackathons, workshops and competitions available.",
              time: "5h ago",
            },
            {
              type: "admin",
              title: "Library timings updated",
              description:
                "Library now open till 11 PM on weekdays.",
              time: "Yesterday",
            },
          ]}
        />

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold text-green-400 mb-6">
            Upcoming Events
          </h2>

          <ul className="space-y-4 text-gray-300">
            <li className="flex justify-between">
              <span>AI Workshop</span>
              <span className="text-green-400">Tomorrow</span>
            </li>
            <li className="flex justify-between">
              <span>Cultural Night</span>
              <span className="text-green-400">Friday</span>
            </li>
            <li className="flex justify-between">
              <span>Sports Meet</span>
              <span className="text-green-400">Next Week</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ADMIN ACTIONS */}
      {user?.role === "admin" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold text-green-400 mb-4">
            Admin Actions
          </h2>

          <div className="flex gap-4">
            <button className="btn-primary">Create Event</button>
            <button className="btn-secondary">Post Announcement</button>
          </div>
        </div>
      )}
    </Layout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="glass-elevated rounded-2xl p-6 transition hover:-translate-y-[2px]">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-green-400 mt-2">{value}</p>
    </div>
  );
}
