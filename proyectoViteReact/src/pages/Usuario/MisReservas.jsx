import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { CardReserva } from "@/components/cards/CardReserva";

export default function MisReservas() {
  const fetchWithAuth = useAuthFetch();
  const [loading, setLoading] = useState(true);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchMisReservas();
  }, []);

  const fetchMisReservas = async () => {
    setLoading(true);

    const res = await fetchWithAuth(API_ROUTES.RESERVAS_MIAS);
    const data = await res.json();

    if (!res.ok) {
      toast.error("Error al cargar las reservas", {
        description: data.mensaje,
      });
      return;
    }

    setReservas(data._embedded?.reservaDTOList || []);

    setLoading(false);
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
        ) : reservas.length === 0 ? (
          <h2 className="text-center text-white">No tienes reservas</h2>
        ) : (
          reservas.map((reserva) => (
            <CardReserva key={reserva.id} reserva={reserva} />
          ))
        )}
      </div>
    </div>
  );
}
