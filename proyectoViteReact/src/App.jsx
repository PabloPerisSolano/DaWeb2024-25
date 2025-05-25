import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute";
import { Layout } from "@/components/layout/Layout";
import Login from "@/pages/login/Login";
import Espacios from "@/pages/gestor/Espacios";
import Eventos from "@/pages/gestor/Eventos";
import ListadoEventos from "@/pages/usuario/ListadoEventos";
import MisReservas from "@/pages/usuario/MisReservas";
import { ROUTES } from "@/constants/routes";

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route
        path={ROUTES.HOME}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path={ROUTES.ESPACIOS.slice(1)} element={<Espacios />} />
        <Route path={ROUTES.EVENTOS.slice(1)} element={<Eventos />} />
        <Route
          path={ROUTES.LISTADO_EVENTOS.slice(1)}
          element={<ListadoEventos />}
        />
        <Route path={ROUTES.RESERVAS.slice(1)} element={<MisReservas />} />
      </Route>
    </Routes>
  );
}
