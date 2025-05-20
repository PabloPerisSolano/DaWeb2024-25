import { useState, useEffect } from "react";
import { API_ROUTES, fetchWithAuth } from "../../api/api";
import { useToast } from "../../context/ToastContext";
import { FaTimes, FaCheck } from "react-icons/fa";

const ModalModificarEvento = ({ id, evento, fetchEventos }) => {
  const { showToast } = useToast();
  const [descripcion, setDescripcion] = useState(evento.descripcion || "");
  const [fechaInicio, setFechaInicio] = useState(
    evento.ocupacion.fechaInicio.substring(0, 16) || ""
  );
  const [fechaFin, setFechaFin] = useState(
    evento.ocupacion.fechaFin.substring(0, 16) || ""
  );
  const [plazas, setPlazas] = useState(evento.plazas || "");
  const [idEspacioFisico, setIdEspacioFisico] = useState(
    evento.ocupacion.espacioFisico.id || ""
  );
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const res = await fetchWithAuth(API_ROUTES.ESPACIOS);
        const data = await res.json();
        setEspacios(data || []);
      } catch (err) {
        showToast("No se pudieron cargar los espacios físicos", "error");
      }
    };
    fetchEspacios();
  }, []);

  const confirmarModificacion = async () => {
    try {
      const res = await fetchWithAuth(`${API_ROUTES.EVENTOS}/${evento.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          descripcion,
          fechaInicio,
          fechaFin,
          plazas,
          idEspacioFisico,
        }),
      });

      if (!res.ok) {
        const errorText = await res.json();
        showToast(`Error: ${res.status} - ${errorText.mensaje}`, "error");
        return;
      }

      fetchEventos();
      showToast("Evento modificado con éxito", "success");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modificar - {evento.nombre}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha Inicio</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha Fin</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Plazas</label>
                <input
                  type="number"
                  className="form-control"
                  min={evento.plazas - evento.plazasDisponibles}
                  max={evento.ocupacion.espacioFisico.capacidad}
                  value={plazas}
                  onChange={(e) => setPlazas(parseInt(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Espacio Físico</label>

                <select
                  className="form-select"
                  value={idEspacioFisico}
                  onChange={(e) => setIdEspacioFisico(e.target.value)}
                >
                  {espacios.map((espacio) => (
                    <option key={espacio.id} value={espacio.id}>
                      {espacio.nombre} - Capacidad: {espacio.capacidad}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary d-flex align-items-center gap-2 justify-content-center"
              data-bs-dismiss="modal"
            >
              <FaTimes />
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2 justify-content-center"
              data-bs-dismiss="modal"
              onClick={confirmarModificacion}
            >
              <FaCheck />
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalModificarEvento;
