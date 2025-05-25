import { API_ROUTES } from "@/constants/apiEndpoints";
import { CardEvento } from "@/components/cards/CardEvento";
import { ModalNuevoEvento } from "@/components/modals/ModalNuevoEvento";
import { PlantillaGestor } from "@/components/PlantillaGestor";

export default function Eventos() {
  return (
    <PlantillaGestor
      titulo="Eventos"
      rutaApi={API_ROUTES.EVENTOS_LISTADO}
      ComponenteCard={CardEvento}
      ComponenteModal={ModalNuevoEvento}
      textoBoton="Crear Evento"
      version="GESTOR"
      extraDataTransform={(data) => data._embedded?.eventoDTOList || []}
    />
  );
}
