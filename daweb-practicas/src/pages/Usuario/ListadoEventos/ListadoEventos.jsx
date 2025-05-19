import React, { useState, useEffect } from "react";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import FiltrosEventos from "./FiltrosEventos";
import EventoCard from "./EventoCard";
import ModalReserva from "./ModalReserva";
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

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

  const fetchEventos = async () => {
    fetchWithAuth(API_ROUTES.EVENTOS_LISTADO)
      .then((res) => res.json())
      .then((data) => setEventos(data._embedded.eventoDTOList))
      .catch((err) => alert("Error al cargar usuarios, err"));
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
    console.log(evento);
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
      />
    </div>
  );
};

export default ListadoEventos;
