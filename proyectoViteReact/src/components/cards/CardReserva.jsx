import { toast } from "sonner";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export const CardReserva = ({ reserva }) => {
  const fetchWithAuth = useAuthFetch();
  const [evento, setEvento] = useState({});

  const getEstadoReserva = () => {
    if (reserva.cancelada || evento.cancelado)
      return <span className="badge text-bg-danger">CANCELADA</span>;

    if (!evento.ocupacion) return null;
    const ahora = new Date();
    const inicio = new Date(evento.ocupacion.fechaInicio);
    const fin = new Date(evento.ocupacion.fechaFin);

    if (ahora < inicio)
      return <span className="badge text-bg-success">ACTIVA</span>;
    if (ahora >= inicio && ahora <= fin)
      return <span className="badge text-bg-warning">EN CURSO</span>;
    if (ahora > fin)
      return <span className="badge text-bg-info">FINALIZADA</span>;

    return null;
  };

  useEffect(() => {
    const fetchEvento = async () => {
      const res = await fetchWithAuth(API_ROUTES.EVENTO_ID(reserva.idEvento));
      const data = await res.json();

      setEvento(data);
    };
    fetchEvento();
  }, [reserva.idEvento]);

  return (
    <div className="col-md-6 my-2">
      <div className="card">
        <div className="card-header">
          <h5 className="d-flex align-items-center justify-content-between">
            <strong>{evento.nombre}</strong>
            {getEstadoReserva()}
          </h5>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <label className="card-label">Plazas Reservadas:</label>{" "}
            {reserva.plazasReservadas}
          </li>
          {evento.ocupacion && (
            <>
              <li className="list-group-item">
                <label className="card-label">Fecha Inicio:</label>{" "}
                {new Date(evento.ocupacion.fechaInicio).toLocaleString()}
              </li>
              <li className="list-group-item">
                <label className="card-label">Fecha de fin:</label>{" "}
                {new Date(evento.ocupacion.fechaFin).toLocaleString()}
              </li>
              <li className="list-group-item">
                <label className="card-label">Espacio:</label>{" "}
                {evento.ocupacion.espacioFisico.nombre} -{" "}
                {evento.ocupacion.espacioFisico.direccion}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
