import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get("/announcements", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(res => setAnnouncements(res.data))
    .catch(() => {
      alert("Session expired");
      window.location.href = "/";
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Announcements</h2>

      {announcements.map(a => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
            backgroundColor:
              a.priority === "important" ? "#fff3cd" : "#f9f9f9",
          }}
        >
          <h3>
            {a.title}{" "}
            {a.priority === "important" && (
              <span style={{ color: "red" }}>[IMPORTANT]</span>
            )}
          </h3>
          <p>{a.content}</p>
          <small>
            Posted by {a.author} •{" "}
            {new Date(a.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
