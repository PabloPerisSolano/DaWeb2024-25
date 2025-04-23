import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Gestor from './pages/Gestor/Gestor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-content">
        <Routes>
          {/* Ambas rutas apuntan al Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          
          {/* Ruta del gestor sin protección */}
          <Route path="/gestor" element={<Gestor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;