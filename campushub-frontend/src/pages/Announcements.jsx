import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAnnouncements = () => {
    axios
      .get("http://127.0.0.1:5000/announcements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setAnnouncements(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const postAnnouncement = () => {
    if (!content.trim()) return;

    axios
      .post(
        "http://127.0.0.1:5000/announcements",
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(() => {
        setContent("");
        fetchAnnouncements();
      });
  };

  return (
    <Layout>
      {/* PAGE HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <img src={logo} alt="CampusHub" className="h-12 w-12" />
        <div>
          <h1 className="text-3xl font-bold text-white">
            Campus Announcements
          </h1>
          <p className="text-gray-400">
            Official updates and important notices
          </p>
        </div>
      </div>

      {/* ADMIN POST BOX */}
      {user.role === "admin" && (
        <div className="glass rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-green-400 mb-4">
            Post New Announcement
          </h2>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write an important update for students..."
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none mb-4"
            rows={4}
          />

          <button className="btn-primary" onClick={postAnnouncement}>
            Publish Announcement
          </button>
        </div>
      )}

      {/* ANNOUNCEMENTS FEED */}
      <div className="space-y-6">
        {announcements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-gray-400 mt-20">
          No announcements available.
        </div>
      )}
    </Layout>
  );
}

/* -------------------------------- */
/* Announcement Card                 */
/* -------------------------------- */

function AnnouncementCard({ announcement }) {
  return (
    <div className="glass-elevated rounded-2xl p-6">
      <div className="flex justify-between items-start mb-3">
        <span className="text-green-400 font-semibold">
          📢 Announcement
        </span>
        <span className="text-xs text-gray-500">
          {new Date(announcement.created_at).toLocaleString()}
        </span>
      </div>

      <p className="text-gray-200 leading-relaxed">
        {announcement.content}
      </p>
    </div>
  );
}
