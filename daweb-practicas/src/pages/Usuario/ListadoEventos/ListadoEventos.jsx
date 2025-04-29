import React, { useState, useEffect } from "react";
import { API_ROUTES } from "../../../config/apiConfig";
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
  const [showModalReserva, setShowModalReserva] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [plazasReserva, setPlazasReserva] = useState(1);

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

  const fetchEventos = async () => {
    // const response = await fetch(API_ROUTES.EVENTOS_LIST, {
    //   credentials: "include",
    // });
    // const data = await response.json();
    setEventos(datosPrueba);
  };

  const datosPrueba = [
    {
      id: "1a2b3c4d-5678-90ef-ghij-klmnopqrstuv",
      nombre: "Concierto de Jazz",
      descripcion: "Noche de jazz con la banda local 'Blue Notes'",
      organizador: "Cultural Events S.L.",
      plazas: 150,
      categoria: "CULTURAL",
      cancelado: false,
      ocupacion: {
        id: "occ-001",
        fechaInicio: "2025-06-15T20:00:00",
        fechaFin: "2025-06-15T23:30:00",
        espacioFisico: {
          id: "esp-001",
          nombre: "Auditorio Principal",
          propietario: "Ayuntamiento",
          capacidad: 500,
          direccion: "Plaza Mayor, 1",
          descripcion: "Auditorio con acústica premium",
          estado: "EN_MANTENIMIENTO",
        },
      },
    },
    {
      id: "2e6d9ba0-1512-4bbf-b0ae-b759512168c8",
      nombre: "Exposición de Pintura",
      descripcion: "Obras del artista contemporáneo Marco Pérez",
      organizador: "Galería Arte Moderno",
      plazas: 0,
      categoria: "CULTURAL",
      cancelado: true,
      ocupacion: null,
    },
    {
      id: "3f4g5h6i-7890-jklm-nopq-rstuvwxyz012",
      nombre: "Taller de Cocina",
      descripcion: "Aprende a hacer sushi con chef profesional",
      organizador: "Escuela Gastronómica",
      plazas: 12,
      categoria: "ENTRETENIMIENTO",
      cancelado: false,
      ocupacion: {
        id: "occ-002",
        fechaInicio: "2025-07-10T17:00:00",
        fechaFin: "2025-07-10T20:00:00",
        espacioFisico: {
          id: "esp-002",
          nombre: "Cocina Didáctica",
          propietario: "Escuela Gastronómica",
          capacidad: 15,
          direccion: "Calle del Aprendizaje, 45",
          descripcion: "Cocina equipada para talleres",
          estado: "ACTIVO",
        },
      },
    },
    {
      id: "4j5k6l7m-8901-nopq-rstu-vwxyz012345",
      nombre: "Conferencia Tecnología",
      descripcion: "El futuro de la inteligencia artificial",
      organizador: "TechSummit 2025",
      plazas: 200,
      categoria: "ACADEMICO",
      cancelado: false,
      ocupacion: {
        id: "occ-003",
        fechaInicio: "2025-09-05T10:00:00",
        fechaFin: "2025-09-05T14:00:00",
        espacioFisico: {
          id: "esp-003",
          nombre: "Sala de Convenciones",
          propietario: "Centro de Negocios",
          capacidad: 300,
          direccion: "Avenida Innovación, 22",
          descripcion: "Sala equipada con tecnología audiovisual",
          estado: "ACTIVO",
        },
      },
    },
    {
      id: "5n6o7p8q-9012-rstu-vwxy-z0123456789",
      nombre: "Maratón de Programación",
      descripcion: "24 horas de programación competitiva",
      organizador: "Asociación de Desarrolladores",
      plazas: 50,
      categoria: "OTRO",
      cancelado: false,
      ocupacion: {
        id: "occ-004",
        fechaInicio: "2025-08-12T09:00:00",
        fechaFin: "2025-08-13T09:00:00",
        espacioFisico: {
          id: "esp-004",
          nombre: "Aula de Informática",
          propietario: "Universidad",
          capacidad: 60,
          direccion: "Campus Universitario, Edificio C",
          descripcion: "Aula con equipos de alto rendimiento",
          estado: "ACTIVO",
        },
      },
    },
  ];

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
        evento.plazas >= filtros.plazasLibresMin) &&
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
