import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { API_ROUTES, fetchWithAuth } from "../../api/api";
import { FaTimes, FaCheck } from "react-icons/fa";

const ModalReserva = ({ id, evento, fetchEventos }) => {
  const { showToast } = useToast();
  const [plazasReserva, setPlazasReserva] = useState(0);

  const confirmarReserva = async () => {
    if (evento.plazasDisponibles < plazasReserva) {
      showToast("No hay suficientes plazas disponibles", "error");
      return;
    }

    if (plazasReserva <= 0) {
      showToast("Debes reservar al menos una plaza", "error");
      return;
    }

    if (new Date(evento.ocupacion.fechaFin) < new Date()) {
      showToast("El evento ya ha finalizado", "error");
      return;
    }

    try {
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
        showToast(
          `Error: ${res.status} - ${
            errorText.plazasReservadas || errorText.mensaje
          }`,
          "error"
        );
        return;
      }

      fetchEventos();
      showToast("Reserva realizada con éxito", "success");
    } catch (err) {
      showToast(`Error de red: ${err.message}`, "error");
    }
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

export default ModalReserva;
