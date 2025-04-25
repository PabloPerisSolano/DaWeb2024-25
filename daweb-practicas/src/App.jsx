import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Gestor from "./pages/Gestor/Gestor";
import "./App.css";

function App() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gestor" element={<Gestor />} />
      </Routes>
    </div>
  );
}

export default App;
