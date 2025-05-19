const EspacioGestorCard = ({ espacio, onEditar }) => (
    <div className="col-md-4 mb-4">
        <div className="card">
            <div class="card-header">
                <h5>{espacio.nombre}</h5>
                <p className="card-subtitle text-muted">{espacio.descripcion}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">Propietario: {espacio.propietario}</li>
                <li className="list-group-item">Capacidad: {espacio.capacidad}</li>
                <li className="list-group-item">Dirección: {espacio.direccion}</li>
                <li className="list-group-item">
                    Estado: {espacio.estado === 'CERRADO_TEMPORALMENTE' ? "Cerrado Temporalmente ❌" : "Activo ✅"}
                </li>
            </ul>

            <div class="card-footer text-end">
                <button
                    className="btn btn-primary"
                    onClick={() => onEditar(espacio)}
                >
                    Editar
                </button>
            </div>
        </div>
    </div>
);

export default EspacioGestorCard;