import { useState, useEffect } from "react";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { toast } from "sonner";
import { FaTimes, FaCheck } from "react-icons/fa";

export const ModalNuevoEvento = ({ id, fetchItems }) => {
  const fetchWithAuth = useAuthFetch();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [organizador, setOrganizador] = useState("");
  const [plazas, setPlazas] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [idEspacioFisico, setIdEspacioFisico] = useState("");
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

  const crearEvento = async () => {
    if (!nombre.trim()) {
      toast.error("Nombre requerido", {
        description: "El nombre no puede estar vacío.",
      });
      return;
    }
    if (!organizador.trim()) {
      toast.error("Organizador requerido", {
        description: "El organizador no puede estar vacío.",
      });
      return;
    }
    if (!plazas || isNaN(plazas) || Number(plazas) < 1) {
      toast.error("Plazas inválidas", {
        description: "Las plazas deben ser un número mayor o igual a 1.",
      });
      return;
    }
    if (!categoria.trim()) {
      toast.error("Categoría requerida", {
        description: "Debes seleccionar una categoría.",
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

    const res = await fetchWithAuth(API_ROUTES.EVENTOS, {
      method: "POST",
      body: JSON.stringify({
        nombre,
        descripcion,
        organizador,
        plazas,
        categoria,
        fechaInicio,
        fechaFin,
        idEspacioFisico,
      }),
    });

    if (!res.ok) {
      const errorText = await res.json();
      toast.error("Error al crear el evento", {
        description: errorText.mensaje,
      });
      return;
    }

    fetchItems();
    toast.success("Evento creado con éxito");
    setNombre("");
    setDescripcion("");
    setOrganizador("");
    setPlazas("");
    setCategoria("");
    setFechaInicio("");
    setFechaFin("");
    setIdEspacioFisico("");
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear nuevo evento</h5>
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
                <label className="form-label">Organizador</label>
                <input
                  type="text"
                  className="form-control"
                  value={organizador}
                  onChange={(e) => setOrganizador(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Plazas</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  value={plazas}
                  onChange={(e) => setPlazas(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="ACADEMICO">ACADEMICO</option>
                  <option value="CULTURAL">CULTURAL</option>
                  <option value="ENTRETENIMIENTO">ENTRETENIMIENTO</option>
                  <option value="DEPORTE">DEPORTE</option>
                  <option value="OTRO">OTRO</option>
                </select>
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
              onClick={crearEvento}
            >
              <FaCheck />
              Crear Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
