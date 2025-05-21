import { API_ROUTES } from "@/api/api";
import CardEvento from "@/components/CardEvento";
import ModalNuevoEvento from "@/components/ModalNuevoEvento";
import BaseGestor from "@/components/BaseGestor";

const Eventos = () => (
  <BaseGestor
    titulo="Eventos"
    rutaApi={API_ROUTES.EVENTOS_LISTADO}
    ComponenteCard={CardEvento}
    ComponenteModal={ModalNuevoEvento}
    textoBoton="Crear Evento"
    version="GESTOR"
    extraDataTransform={(data) => data._embedded.eventoDTOList}
  />
);

export default Eventos;
