import { FaChartLine, FaCalendarCheck, FaUsers } from "react-icons/fa";
import "./Home.css";

export default function Home() {
    return (
        <div className="vista-inicio">
            <h1 className="titulo-bienvenida">Bienvenido al Panel de Gestión</h1>

            <div className="cuadricula-estadisticas">
                {/* Tarjeta de Estadística 1 */}
                <div className="tarjeta-estadistica">
                    <div className="icono-estadistica">
                        <FaChartLine size={24} />
                    </div>
                    <h3>Eventos Activos</h3>
                    <p className="valor-estadistica">12</p>
                </div>

                {/* Tarjeta de Estadística 2 */}
                <div className="tarjeta-estadistica">
                    <div className="icono-estadistica">
                        <FaCalendarCheck size={24} />
                    </div>
                    <h3>Reservas Hoy</h3>
                    <p className="valor-estadistica">8</p>
                </div>

                {/* Tarjeta de Estadística 3 */}
                <div className="tarjeta-estadistica">
                    <div className="icono-estadistica">
                        <FaUsers size={24} />
                    </div>
                    <h3>Espacios Disponibles</h3>
                    <p className="valor-estadistica">5</p>
                </div>
            </div>

            <div className="acciones-rapidas">
                <h2>Acciones Rápidas</h2>
                <div className="botones-accion">
                    <button className="boton-accion">
                        Crear Nuevo Evento
                    </button>
                    <button className="boton-accion">
                        Gestionar Espacios
                    </button>
                    <button className="boton-accion">
                        Ver Reservas
                    </button>
                </div>
            </div>
        </div>
    );
}