import { useState, useEffect } from "react";
import { API_ROUTES } from "@/constants/apiEndpoints";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { FiltrosEventos } from "@/components/FiltrosEventos";
import { CardEvento } from "@/components/cards/CardEvento";
import { toast } from "sonner";

export default function ListadoEventos() {
  const fetchWithAuth = useAuthFetch();
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({
    busquedaGeneral: "",
    categoria: "",
    cancelado: null,
    plazasLibresMin: 0,
    espacioBusqueda: "",
    fechaInicio: null,
    fechaFin: null,
  });

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

  const fetchEventos = async () => {
    setLoading(true);

    const res = await fetchWithAuth(API_ROUTES.EVENTOS_LISTADO);
    const data = await res.json();

    if (!res.ok) {
      toast.error("Error al cargar los eventos", {
        description: data.mensaje,
      });
      return;
    }

    setEventos(data._embedded?.eventoDTOList || []);

    setLoading(false);
  };

  const eventosFiltrados = eventos.filter((evento) => {
    const fechaInicioEvento = evento.ocupacion
      ? new Date(evento.ocupacion.fechaInicio)
      : null;
    const fechaFinEvento = evento.ocupacion
      ? new Date(evento.ocupacion.fechaFin)
      : null;
    const filtroFechaInicio = filtros.fechaInicio
      ? new Date(filtros.fechaInicio)
      : null;
    const filtroFechaFin = filtros.fechaFin ? new Date(filtros.fechaFin) : null;

    return (
      (!filtros.busquedaGeneral ||
        evento.nombre
          .toLowerCase()
          .includes(filtros.busquedaGeneral.toLowerCase()) ||
        evento.descripcion
          .toLowerCase()
          .includes(filtros.busquedaGeneral.toLowerCase()) ||
        evento.organizador
          .toLowerCase()
          .includes(filtros.busquedaGeneral.toLowerCase())) &&
      (!filtros.categoria || evento.categoria === filtros.categoria) &&
      (filtros.cancelado === null || filtros.cancelado === evento.cancelado) &&
      (filtros.plazasLibresMin === null ||
        evento.plazasDisponibles >= filtros.plazasLibresMin) &&
      (!filtroFechaInicio ||
        (fechaInicioEvento && fechaInicioEvento >= filtroFechaInicio)) &&
      (!filtroFechaFin ||
        (fechaFinEvento && fechaFinEvento <= filtroFechaFin)) &&
      (!filtros.espacioBusqueda ||
        (evento.ocupacion &&
          (evento.ocupacion.espacioFisico.nombre
            .toLowerCase()
            .includes(filtros.espacioBusqueda.toLowerCase()) ||
            evento.ocupacion.espacioFisico.direccion
              .toLowerCase()
              .includes(filtros.espacioBusqueda.toLowerCase()))))
    );
  });

  return (
    <div className="page">
      <FiltrosEventos filtros={filtros} setFiltros={setFiltros} />

      <div className="row mt-2">
        {loading ? (
          <div className="text-center text-light">
            <div className="spinner-border" role="status" />
          </div>
        ) : eventos.length === 0 ? (
          <h2 className="text-center text-white">
            No hay eventos en el sistema
          </h2>
        ) : (
          eventosFiltrados.map((evento) => (
            <CardEvento
              key={evento.id}
              evento={evento}
              version="USUARIO"
              onUpdate={(eventoActualizado) =>
                setEventos((prev) =>
                  prev.map((ev) =>
                    ev.id === eventoActualizado.id ? eventoActualizado : ev
                  )
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
