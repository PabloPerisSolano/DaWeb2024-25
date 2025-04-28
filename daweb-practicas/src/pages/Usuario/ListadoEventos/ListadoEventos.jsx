import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../../../config/apiConfig";
import FiltrosEventos from "./FiltrosEventos";
import EventoCard from "./EventoCard";
import ModalReserva from "./ModalReserva";
import "./ListadoEventos.css";

const ListadoEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "",
    cancelado: null,
    espacioFisico: "",
    plazasLibresMin: 0,
  });
  const [showModalReserva, setShowModalReserva] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [plazasReserva, setPlazasReserva] = useState(1);

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

  const fetchEventos = async () => {
    const response = await fetch(API_ROUTES.EVENTOS_LIST, {
      credentials: "include",
    });
    const data = await response.json();
    setEventos(data);
  };

  const handleReservar = (evento) => {
    setEventoSeleccionado(evento);
    console.log(evento);
    setShowModalReserva(true);
  };

  const confirmarReserva = async () => {
    if (
      eventoSeleccionado.plazas >= plazasReserva &&
      !eventoSeleccionado.cancelado
    ) {
      await fetch("URL_API_RESERVAS", {
        method: "POST",
        body: JSON.stringify({
          eventoId: eventoSeleccionado.id,
          plazas: plazasReserva,
        }),
      });
      setShowModalReserva(false);
      fetchEventos();
    }
  };

  return (
    <div className="container">
      <FiltrosEventos filtros={filtros} setFiltros={setFiltros} />

      <div className="row mt-4">
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            onReservar={handleReservar}
          />
        ))}
      </div>

      {showModalReserva && (
        <ModalReserva
          onHide={() => setShowModalReserva(false)}
          evento={eventoSeleccionado}
          plazasReserva={plazasReserva}
          setPlazasReserva={setPlazasReserva}
          onConfirm={confirmarReserva}
        />
      )}
    </div>
  );
};

export default ListadoEventos;
