const EventoCard = ({ evento, onReservar }) => (
  <div className="col-md-6 my-2">
    <div className="card">
      <div className="card-header">
        <h5>
          <strong>{evento.nombre}</strong>
        </h5>
        <p className="card-subtitle text-muted">{evento.descripcion}</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <label className="card-label">Organizador:</label>{" "}
          {evento.organizador}
        </li>
        <li className="list-group-item">
          <label className="card-label">Plazas:</label> {evento.plazas}
        </li>
        <li className="list-group-item">
          <label className="card-label">Plazas Disponibles:</label>{" "}
          {evento.plazasDisponibles}
        </li>
        <li className="list-group-item">
          <label className="card-label">Categoría:</label> {evento.categoria}
        </li>
        <li className="list-group-item">
          <label className="card-label">Estado:</label>{" "}
          {evento.cancelado ? "Cancelado ❌" : "Activo ✅"}
        </li>
        {!evento.cancelado && (
          <>
            <li className="list-group-item">
              <label className="card-label">Fecha Inicio:</label>{" "}
              {new Date(evento.ocupacion.fechaInicio).toLocaleString()}
            </li>
            <li className="list-group-item">
              <label className="card-label">Fecha de fin:</label>{" "}
              {new Date(evento.ocupacion.fechaFin).toLocaleString()}
            </li>
            <li className="list-group-item">
              <label className="card-label">Espacio:</label>{" "}
              {evento.ocupacion.espacioFisico.nombre} -{" "}
              {evento.ocupacion.espacioFisico.direccion}
            </li>
          </>
        )}
      </ul>

      <div className="card-footer text-end">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalReservar"
          onClick={() => onReservar(evento)}
          disabled={evento.cancelado || evento.plazasDisponibles === 0}
        >
          Reservar
        </button>
      </div>
    </div>
  </div>
);

export default EventoCard;
