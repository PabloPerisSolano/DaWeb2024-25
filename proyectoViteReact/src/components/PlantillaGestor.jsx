import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { FaPlusCircle } from "react-icons/fa";

export const PlantillaGestor = ({
  titulo,
  rutaApi,
  ComponenteCard,
  ComponenteModal,
  textoBoton,
  version,
  extraDataTransform = (data) => data,
}) => {
  const fetchWithAuth = useAuthFetch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);

    const res = await fetchWithAuth(rutaApi);
    const data = await res.json();

    if (!res.ok) {
      toast.error(`Error al cargar los eventos ${titulo}`, {
        description: data.mensaje,
      });
      return;
    }

    setItems(extraDataTransform(data));

    setLoading(false);
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
        ) : items.length === 0 ? (
          <h2 className="text-center text-white">
            {`No hay ${titulo} en el sistema`}
          </h2>
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
