import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import { FaPlusCircle } from "react-icons/fa";
import EventoCard from "../../../components/EventoCard/EventoCard";
import ModalNuevoEvento from "../../../components/ModalNuevoEvento/ModalNuevoEvento";
import "./Eventos.css";

const Eventos = () => {
  const { handleLogout } = useAuth();
  const { showToast } = useToast();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const res = await fetchWithAuth(API_ROUTES.EVENTOS_LISTADO);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }

        showToast(`Error: ${res.status} - ${data.message}`, "error");
        return;
      }

      setEventos(data._embedded.eventoDTOList);
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  return (
    <div className="eventos-page">
      <section className="d-flex justify-content-between align-items-center">
        <h1 className="text-white">
          <strong>Eventos</strong>
        </h1>
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2 justify-content-center"
          data-bs-toggle="modal"
          data-bs-target="#modalNuevoEvento"
        >
          <FaPlusCircle />
          Crear Reserva
        </button>
      </section>

      <section className="row mt-2">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            version="Modificar"
            onConfirm={fetchEventos}
          />
        ))}
      </section>

      <ModalNuevoEvento id="modalNuevoEvento" fetchEventos={fetchEventos} />
    </div>
  );
};

export default Eventos;
