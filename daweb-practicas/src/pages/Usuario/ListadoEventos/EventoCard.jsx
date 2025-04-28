const EventoCard = ({ evento, onReservar }) => (
  <div className="col-md-4 mb-4">
    <div className="card">
      <div class="card-header">
        <h5>{evento.nombre}</h5>
        <p className="card-subtitle text-muted">{evento.descripcion}</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Organizador: {evento.organizador}</li>
        <li className="list-group-item">Plazas: {evento.plazas}</li>
        <li className="list-group-item">Categoría: {evento.categoria}</li>
        <li className="list-group-item">
          Estado: {evento.cancelado ? "Cancelado ❌" : "Activo ✅"}
        </li>
        <li className="list-group-item">
          Fecha Inicio:{" "}
          {new Date(evento.ocupacion.fechaInicio).toLocaleString()}
        </li>
        <li className="list-group-item">
          Fecha de fin: {new Date(evento.ocupacion.fechaFin).toLocaleString()}
        </li>
        <li className="list-group-item">
          Espacio Físico: {evento.ocupacion.espacioFisico.nombre} -{" "}
          {evento.ocupacion.espacioFisico.direccion}
        </li>
      </ul>

      <div class="card-footer text-end">
        <button
          className="btn btn-primary"
          onClick={() => onReservar(evento)}
          disabled={evento.cancelado || evento.plazas === 0}
        >
          Reservar
        </button>
      </div>
    </div>
  </div>
);

export default EventoCard;
