import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Announcements from "./pages/Announcements";
import Events from "./pages/Events";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </BrowserRouter>
  );
}

