import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { fetchWithAuth } from "@/api/api";
import { FaPlusCircle } from "react-icons/fa";

const BaseGestor = ({
  titulo,
  rutaApi,
  ComponenteCard,
  ComponenteModal,
  textoBoton,
  version,
  extraDataTransform = (data) => data,
}) => {
  const { handleLogout } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(rutaApi);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }

        showToast(`Error: ${res.status} - ${data.message}`, "error");
        return;
      }

      setItems(extraDataTransform(data));
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="d-flex justify-content-between align-items-center">
        <h2 className="bg-light rounded-4 p-2">
          <strong>{titulo}</strong>
        </h2>
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2 justify-content-center"
          data-bs-toggle="modal"
          data-bs-target={`#modalNuevo${titulo}`}
        >
          <FaPlusCircle />
          {textoBoton}
        </button>
      </section>

      <section className="row mt-2">
        {loading ? (
          <div className="text-center text-light">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          items.map((item) => (
            <ComponenteCard
              key={item.id}
              {...(titulo === "Eventos" ? { evento: item } : { espacio: item })}
              version={version}
              fetchItems={fetchItems}
            />
          ))
        )}
      </section>

      <ComponenteModal id={`modalNuevo${titulo}`} fetchItems={fetchItems} />
    </div>
  );
};

export default BaseGestor;
