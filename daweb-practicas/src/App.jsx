import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Gestor from "./pages/Gestor/Gestor";
import Espacios from "./pages/Gestor/Espacios/Espacios";
import Eventos from "./pages/Gestor/Eventos/Eventos";
import ListadoEventos from "./pages/Usuario/ListadoEventos/ListadoEventos";
import ReservasActivas from "./pages/Usuario/ReservasActivas/ReservasActivas";
import ReservasPrevias from "./pages/Usuario/ReservasPrevias/ReservasPrevias";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="gestor" element={<Gestor />} />
        <Route path="espacios" element={<Espacios />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="listado-eventos" element={<ListadoEventos />} />
        <Route path="reservas-activas" element={<ReservasActivas />} />
        <Route path="reservas-previas" element={<ReservasPrevias />} />
      </Route>
    </Routes>
  );
}

export default App;
