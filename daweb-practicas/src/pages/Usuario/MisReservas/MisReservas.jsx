import { useEffect, useState } from "react";
import { API_ROUTES, fetchWithAuth } from "../../../api/api";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";
import ReservaCard from "../../../components/ReservaCard/ReservaCard";
import "./MisReservas.css";

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const { showToast } = useToast();
  const { handleLogout } = useAuth();

  useEffect(() => {
    fetchMisReservas();
  }, []);

  const fetchMisReservas = async () => {
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
    }
  };

  return (
    <div className="reservas-activas-page">
      <h1>
        <strong>Mis Reservas</strong>
      </h1>

      <div className="row mt-2">
        {reservas.map((reserva) => (
          <ReservaCard key={reserva.id} reserva={reserva} />
        ))}
      </div>
    </div>
  );
};

export default MisReservas;
