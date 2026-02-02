import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Events() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setEvents(res.data))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      {/* PAGE HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <img src={logo} alt="CampusHub" className="h-12 w-12" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Events</h1>
          <p className="text-gray-400">
            Discover, register, and participate in campus activities
          </p>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            user={user}
            refresh={() => window.location.reload()}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-gray-400 mt-20">
          No events available right now.
        </div>
      )}
    </Layout>
  );
}

/* -------------------------------- */
/* Event Card Component              */
/* -------------------------------- */

function EventCard({ event, user, refresh }) {
  const register = () => {
    axios
      .post(
        `http://127.0.0.1:5000/events/${event.id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(refresh);
  };

  const unregister = () => {
    axios
      .delete(`http://127.0.0.1:5000/events/${event.id}/unregister`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(refresh);
  };

  const closeEvent = () => {
    axios
      .post(
        `http://127.0.0.1:5000/events/${event.id}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(refresh);
  };

  return (
    <div className="glass-elevated rounded-3xl overflow-hidden transition hover:-translate-y-1">
      {/* IMAGE */}
      <div
        className="h-40 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655)",
        }}
      >
        <div className="h-full w-full bg-black/60 flex items-end p-4">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              event.status === "open"
                ? "bg-green-500 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            {event.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-4">
          {event.description}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          📍 {event.location} <br />
          📅 {new Date(event.event_date).toLocaleString()}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-3">
          {user.role === "student" && event.status === "open" && (
            <button className="btn-primary" onClick={register}>
              Register
            </button>
          )}

          {user.role === "student" && (
            <button className="btn-secondary" onClick={unregister}>
              Unregister
            </button>
          )}

          {user.role === "admin" && event.status === "open" && (
            <button className="btn-secondary" onClick={closeEvent}>
              Close Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
