import React from "react";

function ListadoEventos() {
  const eventos = [
    {
      id: 1,
      nombre: "Concierto de Rock",
      fecha: "2025-05-10",
      lugar: "Auditorio Central",
    },
    {
      id: 2,
      nombre: "Feria de Tecnología",
      fecha: "2025-06-15",
      lugar: "Centro de Convenciones",
    },
    {
      id: 3,
      nombre: "Exposición de Arte",
      fecha: "2025-07-20",
      lugar: "Galería Nacional",
    },
  ];

  return (
    <div className="listado-eventos-page">
      <h1>Listado de Eventos</h1>
      <p>
        Explora los eventos disponibles y encuentra algo interesante para ti.
      </p>

      <ul className="eventos-list">
        {eventos.map((evento) => (
          <li key={evento.id} className="evento-item">
            <h2>{evento.nombre}</h2>
            <p>Fecha: {evento.fecha}</p>
            <p>Lugar: {evento.lugar}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListadoEventos;
