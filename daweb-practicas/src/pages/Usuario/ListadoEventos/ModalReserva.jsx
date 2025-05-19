import { API_ROUTES, fetchWithAuth } from "../../../api/api";

const confirmarReserva = async (evento, plazasReserva) => {
  if (evento.plazasDisponibles >= plazasReserva && !evento.cancelado) {
    await fetchWithAuth(API_ROUTES.RESERVAS_CREAR, {
      method: "POST",
      body: JSON.stringify({
        idEvento: evento.id,
        plazasReservadas: plazasReserva,
      }),
    });
  }
};

const ModalReserva = ({ evento, plazasReserva, setPlazasReserva }) => (
  <div className="modal fade" id="modalReservar">
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
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => confirmarReserva(evento, plazasReserva)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ModalReserva;
