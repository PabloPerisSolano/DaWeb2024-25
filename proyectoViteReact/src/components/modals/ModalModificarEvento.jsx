import { useState, useEffect } from "react";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { toast } from "sonner";
import { FaTimes, FaCheck } from "react-icons/fa";

export const ModalModificarEvento = ({ id, evento, fetchItems }) => {
  const fetchWithAuth = useAuthFetch();
  const [descripcion, setDescripcion] = useState(evento.descripcion || "");
  const [fechaInicio, setFechaInicio] = useState(
    evento.ocupacion.fechaInicio.substring(0, 16) || ""
  );
  const [fechaFin, setFechaFin] = useState(
    evento.ocupacion.fechaFin.substring(0, 16) || ""
  );
  const [plazas, setPlazas] = useState(evento.plazas || 1);
  const [idEspacioFisico, setIdEspacioFisico] = useState(
    evento.ocupacion.espacioFisico.id || ""
  );
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    if (
      !fechaInicio ||
      !fechaFin ||
      !plazas ||
      isNaN(plazas) ||
      Number(plazas) < 1 ||
      new Date(fechaInicio) < new Date() ||
      new Date(fechaFin) <= new Date(fechaInicio)
    ) {
      setEspacios([]);
      return;
    }

    const fetchEspacios = async () => {
      const res = await fetchWithAuth(
        API_ROUTES.ESPACIOS_LIBRES(fechaInicio, fechaFin, plazas)
      );
      const data = await res.json();
      setEspacios(data || []);
    };

    fetchEspacios();
  }, [fechaInicio, fechaFin, plazas]);

  const confirmarModificacion = async () => {
    if (!plazas || isNaN(plazas) || Number(plazas) < 1) {
      toast.error("Plazas inválidas", {
        description: "Las plazas deben ser un número mayor o igual a 1.",
      });
      return;
    }
    if (!fechaInicio) {
      toast.error("Fecha de inicio requerida", {
        description: "Debes seleccionar una fecha de inicio.",
      });
      return;
    }
    if (new Date(fechaInicio) < new Date()) {
      toast.error("Fecha de inicio inválida", {
        description: "La fecha de inicio debe ser posterior al momento actual.",
      });
      return;
    }
    if (!fechaFin) {
      toast.error("Fecha de fin requerida", {
        description: "Debes seleccionar una fecha de fin.",
      });
      return;
    }
    if (new Date(fechaFin) <= new Date(fechaInicio)) {
      toast.error("Fechas inválidas", {
        description: "La fecha de fin debe ser posterior a la de inicio.",
      });
      return;
    }
    if (!idEspacioFisico) {
      toast.error("Espacio físico requerido", {
        description: "Debes seleccionar un espacio físico.",
      });
      return;
    }

    const res = await fetchWithAuth(API_ROUTES.EVENTO_ID(evento.id), {
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
      toast.error("Error al modificar el evento", {
        description: errorText.mensaje,
      });
      return;
    }

    fetchItems();
    toast.success("Evento modificado con éxito");
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
                <label className="form-label">Espacio Físico</label>
                <select
                  className="form-select"
                  value={idEspacioFisico}
                  onChange={(e) => setIdEspacioFisico(e.target.value)}
                >
                  <option value="">
                    Selecciona un espacio libre en esas fechas
                  </option>
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
