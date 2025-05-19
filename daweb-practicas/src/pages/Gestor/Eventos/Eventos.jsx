import { useState, useEffect } from "react";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";
import EventoCard from "../../../components/EventoCard/EventoCard";
import ModalModificarEvento from "../../../components/ModalModificarEvento/ModalModificarEvento";
import "./Eventos.css";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

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

  const handleModificar = (evento) => {
    setEventoSeleccionado(evento);
  };

  return (
    <div className="eventos-page">
      <h1 className="text-white">
        <strong>Eventos del sistema</strong>
      </h1>

      <div className="row mt-2">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onAccion={handleModificar}
            botonTexto="Modificar"
            modalTarget="#modalModificarEvento"
          />
        ))}
      </div>

      <ModalModificarEvento
        evento={eventoSeleccionado}
        fetchEventos={fetchEventos}
      />
    </div>
  );
};

export default Eventos;
