const ModalReserva = ({
  onHide,
  evento,
  plazasReserva,
  setPlazasReserva,
  onConfirm,
}) => (
  <div className="modal fade show" style={{ display: "block" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Reservar plazas</h5>
          <button type="button" className="btn-close" onClick={onHide}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label className="form-label">
                Plazas a reservar (máx. {evento?.plazas})
              </label>
              <input
                type="number"
                className="form-control"
                min="1"
                max={evento?.plazas}
                value={plazasReserva}
                onChange={(e) => setPlazasReserva(parseInt(e.target.value))}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ModalReserva;
