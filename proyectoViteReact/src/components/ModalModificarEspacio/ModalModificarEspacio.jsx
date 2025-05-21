import { useState } from "react";
import { API_ROUTES, fetchWithAuth } from "../../api/api";
import { useToast } from "../../context/ToastContext";
import { FaTimes, FaCheck } from "react-icons/fa";

const ModalModificarEspacio = ({ id, espacio, fetchEspacios }) => {
  const { showToast } = useToast();
  const [nombre, setNombre] = useState(espacio.nombre || "");
  const [descripcion, setDescripcion] = useState(espacio.descripcion || "");
  const [capacidad, setCapacidad] = useState(espacio.capacidad || 0);

  const confirmarModificacion = async () => {
    try {
      const res = await fetchWithAuth(`${API_ROUTES.ESPACIOS}/${espacio.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          nombre,
          descripcion,
          capacidad,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        showToast(`Error: ${res.status} - ${errorText}`, "error");
        return;
      }

      fetchEspacios();
      showToast("Espacio modificado con éxito", "success");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modificar - {espacio.nombre}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
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
                <label className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  value={capacidad}
                  min="1"
                  onChange={(e) => setCapacidad(e.target.value)}
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

export default ModalModificarEspacio;
