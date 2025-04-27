import React from "react";

function Eventos() {
  return (
    <div className="eventos-page">
      <h1>Gestión de Eventos</h1>
      <p>
        Bienvenido a la página de gestión de eventos. Aquí puedes administrar
        los eventos disponibles.
      </p>

      {/* Ejemplo de una lista básica de eventos */}
      <ul>
        <li>Evento 1 - Fecha: 2025-05-01</li>
        <li>Evento 2 - Fecha: 2025-06-15</li>
        <li>Evento 3 - Fecha: 2025-07-20</li>
      </ul>
    </div>
  );
}

export default Eventos;
