export const FiltrosEventos = ({ filtros, setFiltros }) => {
  return (
    <div className="card">
      <div className="card-body ">
        <h5 className="card-title ">
          <strong>Filtrar Eventos</strong>
        </h5>
        <hr className="my-3" />
        <form className="row g-3">
          <section className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar evento, organizador o descripción..."
              value={filtros.busquedaGeneral}
              onChange={(e) =>
                setFiltros({ ...filtros, busquedaGeneral: e.target.value })
              }
            />
          </section>

          <section className="col-md-2">
            <select
              className="form-select"
              value={filtros.categoria}
              onChange={(e) =>
                setFiltros({ ...filtros, categoria: e.target.value })
              }
            >
              <option value="">Categoría: Todas</option>
              <option value="ACADEMICO">Academico</option>
              <option value="CULTURAL">Cultural</option>
              <option value="ENTRETENIMIENTO">Entretenimiento</option>
              <option value="DEPORTE">Deporte</option>
              <option value="OTRO">Otro</option>
            </select>
          </section>

          <section className="col-12 col-md-2">
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
              <option value="">Estado: Todos</option>
              <option value="false">No cancelados</option>
              <option value="true">Cancelados</option>
            </select>
          </section>

          <section className="col-12 col-md-3">
            <div className="input-group">
              <span className="input-group-text">Plazas Disponibles:</span>
              <input
                type="number"
                className="form-control"
                min="0"
                value={filtros.plazasLibresMin}
                onChange={(e) =>
                  setFiltros({ ...filtros, plazasLibresMin: e.target.value })
                }
              />
            </div>
          </section>

          <section className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre de espacio o dirección..."
              value={filtros.espacioBusqueda || ""}
              onChange={(e) =>
                setFiltros({ ...filtros, espacioBusqueda: e.target.value })
              }
            />
          </section>

          <section className="col-md-3">
            <div className="input-group">
              <span className="input-group-text">Fecha Inicio:</span>
              <input
                type="date"
                className="form-control"
                value={filtros.fechaInicio || ""}
                onChange={(e) =>
                  setFiltros({ ...filtros, fechaInicio: e.target.value })
                }
              />
            </div>
          </section>

          <section className="col-md-3">
            <div className="input-group">
              <span className="input-group-text">Fecha Fin:</span>
              <input
                type="date"
                className="form-control"
                value={filtros.fechaFin || ""}
                onChange={(e) =>
                  setFiltros({ ...filtros, fechaFin: e.target.value })
                }
              />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
