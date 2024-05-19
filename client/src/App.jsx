import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reg from "./pages/Reg";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Reg" element={<Reg />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
