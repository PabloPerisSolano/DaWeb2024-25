import { useToast } from "@/context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "@/api/api";
import { FaPencilAlt, FaRegCalendarPlus, FaPowerOff } from "react-icons/fa";
import ModalModificarEvento from "@/components/ModalModificarEvento";
import ModalReserva from "@/components/ModalReserva";

const CardEvento = ({ evento, version, fetchItems }) => {
  const { showToast } = useToast();

  const cancelarEvento = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_ROUTES.EVENTOS}/${evento.id}/ocupacion`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        const errorJson = await res.json();
        showToast(`Error: ${res.status} - ${errorJson.mensaje}`, "error");
        return;
      }

      fetchItems();
      showToast("Evento cancelado con éxito", "success");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  const getEstadoEvento = () => {
    if (evento.cancelado)
      return <span className="badge text-bg-danger">CANCELADO</span>;

    if (!evento.ocupacion) return null;
    const ahora = new Date();
    const inicio = new Date(evento.ocupacion.fechaInicio);
    const fin = new Date(evento.ocupacion.fechaFin);

    if (ahora < inicio)
      return <span className="badge text-bg-success">ACTIVO</span>;
    if (ahora >= inicio && ahora <= fin)
      return <span className="badge text-bg-warning">EN CURSO</span>;
    if (ahora > fin)
      return <span className="badge text-bg-info">FINALIZADO</span>;

    return null;
  };

  return (
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
            {version === "USUARIO" ? (
              <>
                <label className="card-label">Plazas Disponibles:</label>{" "}
                {evento.plazasDisponibles}
              </>
            ) : (
              <>
                <label className="card-label">Plazas Reservadas:</label>{" "}
                {evento.plazas - evento.plazasDisponibles}
              </>
            )}
          </li>
          <li className="list-group-item">
            <label className="card-label">Categoría:</label> {evento.categoria}
          </li>
          <li className="list-group-item">
            <label className="card-label">Estado:</label> {getEstadoEvento()}
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
                {evento.ocupacion.espacioFisico.direccion} - Capacidad:{" "}
                {evento.ocupacion.espacioFisico.capacidad}
              </li>
            </>
          )}
        </ul>

        <div
          className={`card-footer d-flex ${
            version === "GESTOR"
              ? "justify-content-between"
              : "justify-content-end"
          }`}
        >
          {version === "GESTOR" ? (
            <button
              className="btn btn-danger d-flex align-items-center gap-2 justify-content-center"
              disabled={
                evento.cancelado ||
                new Date(evento.ocupacion?.fechaInicio) < new Date()
              }
              onClick={() => cancelarEvento()}
            >
              <FaPowerOff />
              Cancelar Evento
            </button>
          ) : null}
          <button
            className="btn btn-info d-flex align-items-center gap-2 justify-content-center"
            data-bs-toggle="modal"
            data-bs-target={
              version === "USUARIO"
                ? `#modalReserva-${evento.id}`
                : `#modalModificarEvento-${evento.id}`
            }
            disabled={
              evento.cancelado ||
              evento.plazasDisponibles === 0 ||
              new Date(evento.ocupacion?.fechaInicio) < new Date()
            }
          >
            {version === "USUARIO" ? <FaRegCalendarPlus /> : null}
            {version === "GESTOR" ? <FaPencilAlt /> : null}
            {version === "USUARIO" ? "Reservar" : "Modificar"}
          </button>
        </div>
      </div>

      {!evento.cancelado && (
        <>
          <ModalModificarEvento
            id={`modalModificarEvento-${evento.id}`}
            evento={evento}
            fetchItems={fetchItems}
          />
          <ModalReserva
            id={`modalReserva-${evento.id}`}
            evento={evento}
            fetchItems={fetchItems}
          />
        </>
      )}
    </div>
  );
};

export default CardEvento;
