import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaCalendarAlt, FaBuilding, FaListAlt, FaHome } from "react-icons/fa";
import Home from './Home';
import "./Gestor.css";

function Gestor() {
    const [activeTab, setActiveTab] = useState("home");
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="contenedor-gestor">
            {/* Cabecera Superior */}
            <header className="cabecera-superior">
                <div className="contenido-cabecera">
                    <div className="titulo-cabecera">
                        <h3>Panel de Gestión</h3>
                        <p className="mensaje-bienvenida">Bienvenido, {/*username*/}</p>
                    </div>

                    <nav className="navegacion-principal">
                        <button
                            className={`boton-nav ${activeTab === "home" ? "activo" : ""}`}
                            onClick={() => setActiveTab("home")}
                        >
                            <FaHome className="icono-nav" />
                            Inicio
                        </button>

                        <button
                            className={`boton-nav ${activeTab === "espacios" ? "activo" : ""}`}
                            onClick={() => setActiveTab("espacios")}
                        >
                            <FaBuilding className="icono-nav" />
                            Espacios
                        </button>

                        <button
                            className={`boton-nav ${activeTab === "eventos" ? "activo" : ""}`}
                            onClick={() => setActiveTab("eventos")}
                        >
                            <FaCalendarAlt className="icono-nav" />
                            Eventos
                        </button>

                        <button
                            className={`boton-nav ${activeTab === "reservas" ? "activo" : ""}`}
                            onClick={() => setActiveTab("reservas")}
                        >
                            <FaListAlt className="icono-nav" />
                            Reservas
                        </button>
                    </nav>

                    <button className="boton-logout" onClick={handleLogout}>
                        <FaSignOutAlt className="icono-nav" />
                        Cerrar sesión
                    </button>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="contenido-principal">
                {activeTab === "home" && <Home />}
            </main>
        </div>
    );
}

export default Gestor;