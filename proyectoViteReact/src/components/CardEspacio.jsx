import { useToast } from "@/context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "@/api/api";
import { FaPencilAlt, FaPowerOff } from "react-icons/fa";
import ModalModificarEspacio from "@/components/ModalModificarEspacio";

const CardEspacio = ({ espacio, fetchItems }) => {
  const { showToast } = useToast();

  const cambiarEstado = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_ROUTES.ESPACIOS}/${espacio.id}/estado`,
        {
          method: "PUT",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        showToast(`Error: ${res.status} - ${errorText}`, "error");
        return;
      }

      fetchItems();
      showToast("Estado modificado con éxito", "success");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  const getEstadoEspacio = () => {
    if (espacio.estado === "CERRADO_TEMPORALMENTE")
      return <span className="badge text-bg-danger">CERRADO</span>;
    if (espacio.estado === "ACTIVO")
      return <span className="badge text-bg-success">ACTIVO</span>;

    return null;
  };

  return (
    <div className="col-md-6 my-2">
      <div className="card">
        <div className="card-header">
          <h5>
            <strong>{espacio.nombre}</strong>
          </h5>
          <p className="card-subtitle text-muted">{espacio.descripcion}</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <label className="card-label">Propietario: </label>{" "}
            {espacio.propietario}
          </li>
          <li className="list-group-item">
            <label className="card-label">Capacidad: </label>{" "}
            {espacio.capacidad}
          </li>
          <li className="list-group-item">
            <label className="card-label">Dirección: </label>{" "}
            {espacio.direccion}
          </li>
          <li className="list-group-item">
            <label className="card-label">Estado: </label> {getEstadoEspacio()}
          </li>
        </ul>

        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-danger d-flex align-items-center gap-2 justify-content-center"
            onClick={() => cambiarEstado()}
          >
            <FaPowerOff />
            Cambiar Estado
          </button>
          <button
            className="btn btn-info d-flex align-items-center gap-2 justify-content-center"
            data-bs-toggle="modal"
            data-bs-target={`#modalModificarEspacio-${espacio.id}`}
          >
            <FaPencilAlt />
            Modificar
          </button>
        </div>
      </div>

      <ModalModificarEspacio
        id={`modalModificarEspacio-${espacio.id}`}
        espacio={espacio}
        fetchItems={fetchItems}
      />
    </div>
  );
};

export default CardEspacio;
