import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState({});

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    api.get("/events", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (res) => {
      setEvents(res.data);

      // fetch registration status per event
      const statuses = {};
      for (let e of res.data) {
        const s = await api.get(`/events/${e.id}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        statuses[e.id] = s.data.registered;
      }
      setRegistered(statuses);
    });
  }, []);

  const register = (id) => {
    api.post(`/events/${id}/register`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setRegistered({ ...registered, [id]: true });
    });
  };

  const unregister = (id) => {
    api.post(`/events/${id}/unregister`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setRegistered({ ...registered, [id]: false });
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Events</h2>

      {events.map((e) => (
        <div key={e.id} style={{
          border: "1px solid #ddd",
          marginBottom: 15,
          padding: 15,
        }}>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p>Status: <b>{e.status}</b></p>

          {registered[e.id] ? (
            <button onClick={() => unregister(e.id)}>
              Unregister
            </button>
          ) : (
            <button onClick={() => register(e.id)}>
              Register
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
