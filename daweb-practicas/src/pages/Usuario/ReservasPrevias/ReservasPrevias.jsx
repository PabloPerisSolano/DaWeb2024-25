import React from "react";

function ReservasPrevias() {
  const reservas = [
    {
      id: 1,
      evento: "Concierto de Jazz",
      fecha: "2025-03-15",
      lugar: "Teatro Principal",
    },
    {
      id: 2,
      evento: "Exposición de Fotografía",
      fecha: "2025-02-10",
      lugar: "Galería de Arte",
    },
    {
      id: 3,
      evento: "Torneo de Ajedrez",
      fecha: "2025-01-20",
      lugar: "Centro Deportivo",
    },
  ];

  return (
    <div className="reservas-previas-page">
      <h1>Mis Reservas Previas</h1>
      <p>Aquí puedes ver tus reservas previas.</p>

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

export default ReservasPrevias;
