import { API_ROUTES } from "@/constants/apiEndpoints";
import { CardEspacio } from "@/components/cards/CardEspacio";
import { ModalNuevoEspacio } from "@/components/modals/ModalNuevoEspacio";
import { PlantillaGestor } from "@/components/PlantillaGestor";

export default function Espacios() {
  return (
    <PlantillaGestor
      titulo="Espacios"
      rutaApi={API_ROUTES.ESPACIOS}
      ComponenteCard={CardEspacio}
      ComponenteModal={ModalNuevoEspacio}
      textoBoton="Crear Espacio"
    />
  );
}
