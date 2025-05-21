import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "@/api/api";
import CardReserva from "@/components/CardReserva";

const MisReservas = () => {
  const { handleLogout } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchMisReservas();
  }, []);

  const fetchMisReservas = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(API_ROUTES.RESERVAS_MIAS);
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          return;
        }

        showToast(`Error: ${res.status} - ${data.message}`, "error");
        return;
      }

      setReservas(data._embedded.reservaDTOList);
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="bg-light rounded-4 p-2 d-inline-block">
        <strong>Mis Reservas</strong>
      </h2>

      <div className="row mt-2">
        {loading ? (
          <div className="text-center text-light">
            <div className="spinner-border" role="status" />
          </div>
        ) : (
          reservas.map((reserva) => (
            <CardReserva key={reserva.id} reserva={reserva} />
          ))
        )}
      </div>
    </div>
  );
};

export default MisReservas;
