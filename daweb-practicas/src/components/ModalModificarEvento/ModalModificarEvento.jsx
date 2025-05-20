import { useState, useEffect } from "react";
import { API_ROUTES, fetchWithAuth } from "../../api/api";
import { useToast } from "../../context/ToastContext";
import { FaTimes, FaCheck } from "react-icons/fa";

const ModalModificarEvento = ({ evento, fetchEventos }) => {
  console.log("Evento a modificar:", evento);
  const { showToast } = useToast();
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [plazas, setPlazas] = useState("");
  const [idEspacioFisico, setIdEspacioFisico] = useState("");

  useEffect(() => {
    if (evento) {
      setDescripcion(evento.descripcion || "");
      setFechaInicio(
        evento?.ocupacion?.fechaInicio
          ? evento.ocupacion.fechaInicio.substring(0, 16)
          : ""
      );
      setFechaFin(
        evento?.ocupacion?.fechaFin
          ? evento.ocupacion.fechaFin.substring(0, 16)
          : ""
      );
      setPlazas(evento.plazas || "");
      setIdEspacioFisico(evento?.ocupacion?.espacioFisico?.id || "");
    }
  }, [evento]);

  const confirmarModificacion = async () => {
    const patchData = {};
    if (descripcion !== "") patchData.descripcion = descripcion;
    if (fechaInicio !== "") patchData.fechaInicio = fechaInicio;
    if (fechaFin !== "") patchData.fechaFin = fechaFin;
    if (plazas !== "") patchData.plazas = plazas;
    if (idEspacioFisico !== "") patchData.idEspacioFisico = idEspacioFisico;

    try {
      const res = await fetchWithAuth(`${API_ROUTES.EVENTOS}/${evento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });

      if (!res.ok) {
        const errorText = await res.json();
        showToast(
          `Error: ${res.status} - ${errorText.mensaje || errorText.message}`,
          "error"
        );
        return;
      }

      fetchEventos();
      showToast("Evento modificado con éxito", "success");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  return (
    <div className="modal fade" id="modalModificarEvento">
      <div className="modal-dialog modal-dialog-centered">
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
                  min="1"
                  value={plazas}
                  onChange={(e) => setPlazas(parseInt(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">ID Espacio Físico</label>
                <input
                  type="text"
                  className="form-control"
                  value={idEspacioFisico}
                  onChange={(e) => setIdEspacioFisico(e.target.value)}
                />
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
