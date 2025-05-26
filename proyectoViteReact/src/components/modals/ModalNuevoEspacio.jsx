import { useState } from "react";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { toast } from "sonner";
import { FaTimes, FaCheck } from "react-icons/fa";

export const ModalNuevoEspacio = ({ id, onAdd }) => {
  const fetchWithAuth = useAuthFetch();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [propietario, setPropietario] = useState("");
  const [capacidad, setCapacidad] = useState(1);
  const [direccion, setDireccion] = useState("");

  const crearEspacio = async () => {
    if (!nombre.trim()) {
      toast.error("Nombre requerido", {
        description: "El nombre no puede estar vacío.",
      });
      return;
    }
    if (!propietario.trim()) {
      toast.error("Propietario requerido", {
        description: "El propietario no puede estar vacío.",
      });
      return;
    }
    if (!direccion.trim()) {
      toast.error("Dirección requerida", {
        description: "La dirección no puede estar vacía.",
      });
      return;
    }
    if (!capacidad || isNaN(capacidad) || Number(capacidad) < 1) {
      toast.error("Capacidad inválida", {
        description: "La capacidad debe ser un número mayor o igual a 1.",
      });
      return;
    }

    const res = await fetchWithAuth(API_ROUTES.ESPACIOS, {
      method: "POST",
      body: JSON.stringify({
        nombre,
        descripcion,
        propietario,
        capacidad,
        direccion,
        longitud: 0.0,
        latitud: 0.0,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      toast.error("Error al crear el espacio", {
        description: errorText,
      });
      return;
    }

    const location = res.headers.get("Location");
    const idEspacioNuevo = location.split("/").pop();

    const resEspacio = await fetchWithAuth(
      API_ROUTES.ESPACIO_ID(idEspacioNuevo)
    );
    const nuevoEspacio = await resEspacio.json();
    if (onAdd) onAdd(nuevoEspacio);

    toast.success("Espacio creado con éxito");

    setNombre("");
    setDescripcion("");
    setPropietario("");
    setCapacidad(1);
    setDireccion("");
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Espacio</h5>
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
                <label className="form-label">Propietario</label>
                <input
                  type="text"
                  className="form-control"
                  value={propietario}
                  onChange={(e) => setPropietario(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
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
              onClick={crearEspacio}
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
