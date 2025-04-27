import React from "react";

function ReservasActivas() {
  const reservas = [
    {
      id: 1,
      evento: "Concierto de Rock",
      fecha: "2025-05-10",
      lugar: "Auditorio Central",
    },
    {
      id: 2,
      evento: "Feria de Tecnología",
      fecha: "2025-06-15",
      lugar: "Centro de Convenciones",
    },
  ];

  return (
    <div className="reservas-activas-page">
      <h1>Mis Reservas Activas</h1>
      <p>Aquí puedes ver tus reservas activas.</p>

      <ul className="reservas-list">
        {reservas.map((reserva) => (
          <li key={reserva.id} className="reserva-item">
            <h2>{reserva.evento}</h2>
            <p>Fecha: {reserva.fecha}</p>
            <p>Lugar: {reserva.lugar}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservasActivas;
