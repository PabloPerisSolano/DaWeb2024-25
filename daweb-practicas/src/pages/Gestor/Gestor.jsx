import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaCalendarAlt,
  FaBuilding,
  FaListAlt,
  FaHome,
} from "react-icons/fa";
import Home from "./Home";
import "./Gestor.css";
import { API_ROUTES } from "../../api/api";
import Header from "../../components/Header/Header";

function Gestor() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(API_ROUTES.LOGOUT, {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <div className="contenedor-gestor">
      <main className="contenido-principal">
        {activeTab === "home" && <Home />}
      </main>
    </div>
  );
}

export default Gestor;
