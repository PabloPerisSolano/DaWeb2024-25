import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import FiltrosEventos from "../../../components/FiltrosEventos/FiltrosEventos";
import EventoCard from "../../../components/EventoCard/EventoCard";

import "./ListadoEventos.css";

const ListadoEventos = () => {
  const { handleLogout } = useAuth();
  const { showToast } = useToast();
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({
    busquedaGeneral: "",
    categoria: "",
    cancelado: null,
    plazasLibresMin: 0,
    espacioBusqueda: "",
    fechaInicio: null,
    fechaFin: null,
  });

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

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

  const eventosFiltrados = eventos.filter((evento) => {
    const fechaInicioEvento = evento.ocupacion
      ? new Date(evento.ocupacion.fechaInicio)
      : null;
    const fechaFinEvento = evento.ocupacion
      ? new Date(evento.ocupacion.fechaFin)
      : null;
    const filtroFechaInicio = filtros.fechaInicio
      ? new Date(filtros.fechaInicio)
      : null;
    const filtroFechaFin = filtros.fechaFin ? new Date(filtros.fechaFin) : null;

    return (
      (!filtros.busquedaGeneral ||
        evento.nombre
          .toLowerCase()
          .includes(filtros.busquedaGeneral.toLowerCase()) ||
        evento.descripcion
          .toLowerCase()
          .includes(filtros.busquedaGeneral.toLowerCase()) ||
        evento.organizador
          .toLowerCase()
          .includes(filtros.busquedaGeneral.toLowerCase())) &&
      (!filtros.categoria || evento.categoria === filtros.categoria) &&
      (filtros.cancelado === null || filtros.cancelado === evento.cancelado) &&
      (filtros.plazasLibresMin === null ||
        evento.plazasDisponibles >= filtros.plazasLibresMin) &&
      (!filtroFechaInicio ||
        (fechaInicioEvento && fechaInicioEvento >= filtroFechaInicio)) &&
      (!filtroFechaFin ||
        (fechaFinEvento && fechaFinEvento <= filtroFechaFin)) &&
      (!filtros.espacioBusqueda ||
        (evento.ocupacion &&
          (evento.ocupacion.espacioFisico.nombre
            .toLowerCase()
            .includes(filtros.espacioBusqueda.toLowerCase()) ||
            evento.ocupacion.espacioFisico.direccion
              .toLowerCase()
              .includes(filtros.espacioBusqueda.toLowerCase()))))
    );
  });

  return (
    <div className="eventos-page">
      <FiltrosEventos filtros={filtros} setFiltros={setFiltros} />

      <div className="row mt-2">
        {eventosFiltrados.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            version="Reservar"
            onConfirm={fetchEventos}
          />
        ))}
      </div>
    </div>
  );
};

export default ListadoEventos;
