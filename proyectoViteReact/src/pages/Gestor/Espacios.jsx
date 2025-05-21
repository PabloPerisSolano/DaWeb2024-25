import { API_ROUTES } from "@/api/api";
import CardEspacio from "@/components/CardEspacio";
import ModalNuevoEspacio from "@/components/ModalNuevoEspacio";
import BaseGestor from "@/components/BaseGestor";

const Espacios = () => (
  <BaseGestor
    titulo="Espacios"
    rutaApi={API_ROUTES.ESPACIOS}
    ComponenteCard={CardEspacio}
    ComponenteModal={ModalNuevoEspacio}
    textoBoton="Crear Espacio"
  />
);

export default Espacios;
