import { useState, useEffect } from "react";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import FiltrosEventos from "./FiltrosEventos";
import EventoCard from "./EventoCard";
import ModalReserva from "./ModalReserva";
import { useToast } from "../../../context/ToastContext";
import "./ListadoEventos.css";

const ListadoEventos = () => {
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
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [plazasReserva, setPlazasReserva] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

  const fetchEventos = async () => {
    try {
      const res = await fetchWithAuth(API_ROUTES.EVENTOS_LISTADO);
      if (!res.ok) {
        const errorText = await res.json();
        showToast(`Error: ${res.status} - ${errorText.message}`, "error");
        return;
      }
      const data = await res.json();
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

  const handleReservar = (evento) => {
    setEventoSeleccionado(evento);
  };

  return (
    <div>
      <FiltrosEventos filtros={filtros} setFiltros={setFiltros} />

      <div className="row mt-2">
        {eventosFiltrados.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onReservar={handleReservar}
          />
        ))}
      </div>

      <ModalReserva
        evento={eventoSeleccionado}
        plazasReserva={plazasReserva}
        setPlazasReserva={setPlazasReserva}
        fetchEventos={fetchEventos}
      />
    </div>
  );
};

export default ListadoEventos;
