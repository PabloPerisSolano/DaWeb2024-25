import { useState } from "react";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { toast } from "sonner";
import { FaTimes, FaCheck } from "react-icons/fa";

export const ModalModificarEspacio = ({ id, espacio, fetchItems }) => {
  const fetchWithAuth = useAuthFetch();
  const [nombre, setNombre] = useState(espacio.nombre || "");
  const [descripcion, setDescripcion] = useState(espacio.descripcion || "");
  const [capacidad, setCapacidad] = useState(espacio.capacidad || 1);

  const confirmarModificacion = async () => {
    if (!nombre.trim()) {
      toast.error("Nombre requerido", {
        description: "El nombre no puede estar vacío.",
      });
      return;
    }
    if (!capacidad || isNaN(capacidad) || Number(capacidad) < 1) {
      toast.error("Capacidad inválida", {
        description: "La capacidad debe ser un número mayor o igual a 1.",
      });
      return;
    }

    const res = await fetchWithAuth(API_ROUTES.ESPACIO_ID(espacio.id), {
      method: "PATCH",
      body: JSON.stringify({
        nombre,
        descripcion,
        capacidad,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      toast.error("Error al modificar el espacio", {
        description: errorText,
      });
    }

    fetchItems();
    toast.success("Espacio modificado con éxito");
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
