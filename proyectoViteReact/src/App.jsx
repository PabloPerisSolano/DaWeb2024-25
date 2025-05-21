import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute";
import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";
import Espacios from "@/pages/Gestor/Espacios";
import Eventos from "@/pages/Gestor/Eventos";
import ListadoEventos from "@/pages/Usuario/ListadoEventos";
import MisReservas from "@/pages/Usuario/MisReservas";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="espacios" element={<Espacios />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="listado-eventos" element={<ListadoEventos />} />
        <Route path="reservas" element={<MisReservas />} />
      </Route>
    </Routes>
  );
}

export default App;
