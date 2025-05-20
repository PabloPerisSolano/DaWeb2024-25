import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import { FaPlusCircle } from "react-icons/fa";
import CardEspacio from "../../../components/CardEspacio/CardEspacio";
import ModalNuevoEspacio from "../../../components/ModalNuevoEspacio/ModalNuevoEspacio";
import "./Espacios.css";

const ListadoEspacios = () => {
  const { handleLogout } = useAuth();
  const { showToast } = useToast();
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    fetchEspacios();
  }, []);

  const fetchEspacios = async () => {
    try {
      const res = await fetchWithAuth(API_ROUTES.ESPACIOS);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }

        showToast(`Error: ${res.status} - ${data.message}`, "error");
        return;
      }

      setEspacios(data);
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
  };

  return (
    <div className="espacios-page">
      <section className="d-flex justify-content-between align-items-center">
        <h2 className="bg-light rounded-4 p-2">
          <strong>Espacios</strong>
        </h2>
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2 justify-content-center"
          data-bs-toggle="modal"
          data-bs-target="#modalNuevoEspacio"
        >
          <FaPlusCircle />
          Crear Espacio
        </button>
      </section>

      <section className="row mt-2">
        {espacios.map((espacio) => (
          <CardEspacio
            key={espacio.id}
            espacio={espacio}
            onConfirm={fetchEspacios}
          />
        ))}
      </section>

      <ModalNuevoEspacio id="modalNuevoEspacio" fetchEspacios={fetchEspacios} />
    </div>
  );
};

export default ListadoEspacios;
