import { useState } from "react";
import { toast } from "sonner";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { FaTimes, FaCheck } from "react-icons/fa";

export const ModalReserva = ({ id, evento, fetchItems }) => {
  const fetchWithAuth = useAuthFetch();
  const [plazasReserva, setPlazasReserva] = useState(1);

  const confirmarReserva = async () => {
    if (evento.plazasDisponibles < plazasReserva) {
      toast.error("No hay suficientes plazas disponibles");
      return;
    }

    if (plazasReserva <= 0) {
      toast.error("Debes reservar al menos una plaza");
      return;
    }

    if (new Date(evento.ocupacion.fechaFin) < new Date()) {
      toast.error("El evento ya ha finalizado");
      return;
    }

    const res = await fetchWithAuth(API_ROUTES.RESERVAS, {
      method: "POST",
      body: JSON.stringify({
        idEvento: evento.id,
        plazasReservadas: plazasReserva,
      }),
    });

    setPlazasReserva(0);

    if (!res.ok) {
      const errorText = await res.json();
      toast.error("Error al reservar", {
        description: errorText.plazasReservadas,
      });
      return;
    }

    // Esperar para actualizar las plazas disponibles del evento
    setTimeout(() => {
      fetchItems();
      toast.success("Reserva realizada con éxito");
    }, 1000);
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reservar plazas</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Plazas a reservar (máx. {evento?.plazasDisponibles})
                </label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={evento?.plazasDisponibles}
                  value={plazasReserva}
                  onChange={(e) => setPlazasReserva(parseInt(e.target.value))}
                />
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
              onClick={confirmarReserva}
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
