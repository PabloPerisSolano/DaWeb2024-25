const FiltrosEventos = ({ filtros, setFiltros }) => (
  <div className="card mb-4">
    <div className="card-body">
      <form>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del evento"
              value={filtros.nombre}
              onChange={(e) =>
                setFiltros({ ...filtros, nombre: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={filtros.categoria}
              onChange={(e) =>
                setFiltros({ ...filtros, categoria: e.target.value })
              }
            >
              <option value="">Todas las categorías</option>
              <option value="CULTURAL">Cultural</option>
              <option value="DEPORTE">Deporte</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={filtros.cancelado ?? ""}
              onChange={(e) =>
                setFiltros({
                  ...filtros,
                  cancelado:
                    e.target.value === "" ? null : e.target.value === "true",
                })
              }
            >
              <option value="">Todos</option>
              <option value="false">Activos</option>
              <option value="true">Cancelados</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Mín. plazas libres"
              value={filtros.plazasLibresMin}
              onChange={(e) =>
                setFiltros({ ...filtros, plazasLibresMin: e.target.value })
              }
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default FiltrosEventos;
