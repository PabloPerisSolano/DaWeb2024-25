import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Gestor from "./pages/Gestor/Gestor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/gestor" element={<Gestor />} />
    </Routes>
  );
}

export default App;
