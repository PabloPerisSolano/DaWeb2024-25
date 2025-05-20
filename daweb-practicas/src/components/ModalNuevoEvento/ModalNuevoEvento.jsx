import { useState, useEffect } from "react";
import { API_ROUTES, fetchWithAuth } from "../../api/api";
import { useToast } from "../../context/ToastContext";
import { FaTimes, FaCheck } from "react-icons/fa";

const ModalModificarEvento = ({ id, fetchEventos }) => {
  const { showToast } = useToast();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [organizador, setOrganizador] = useState("");
  const [plazas, setPlazas] = useState("");
  const [categoria, setCategoria] = useState("CULTURAL");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [idEspacioFisico, setIdEspacioFisico] = useState("");
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

  const crearEvento = async () => {
    try {
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
        let mensaje = "";
        if (errorText.mensaje) {
          mensaje = errorText.mensaje;
        } else {
          mensaje = JSON.stringify(errorText);
        }
        showToast(`Error: ${res.status} - ${mensaje}`, "error");
        return;
      }

      fetchEventos();
      showToast("Evento modificado con éxito", "success");
      setNombre("");
      setDescripcion("");
      setOrganizador("");
      setPlazas("");
      setCategoria("");
      setFechaInicio("");
      setFechaFin("");
      setIdEspacioFisico("");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
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
                  <option value="">Selecciona un espacio</option>
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

export default ModalModificarEvento;
