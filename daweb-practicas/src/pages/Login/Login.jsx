import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaGithub } from "react-icons/fa";
import { API_ROUTES } from "../../config/apiConfig";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(API_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        handleLogin({
          idUsuario: data.idUsuario,
          roles: data.roles,
        });

        navigate("/gestor");
      } else {
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  const handleGithubLogin = () => {
    // Abre una ventana emergente para el login con GitHub
    const popup = window.open(
      API_ROUTES.GITHUB_LOGIN,
      "github-login",
      "width=600,height=600"
    );

    // Escucha los mensajes de la ventana emergente
    const messageListener = (event) => {
      // Verifica el origen del mensaje por seguridad
      if (event.origin !== "http://localhost:8090") return;

      if (event.data.token) {
        // Guarda el token y redirige
        navigate("/gestor");
        popup.close();
        window.removeEventListener("message", messageListener);
      } else if (event.data.error) {
        alert(event.data.error);
        popup.close();
        window.removeEventListener("message", messageListener);
      }
    };

    window.addEventListener("message", messageListener);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Tu nombre de usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="login-button">
            Acceder
          </button>
        </form>

        <div className="login-divider">
          <span>o</span>
        </div>

        <button onClick={handleGithubLogin} className="github-button">
          <FaGithub className="github-icon" />
          Continuar con GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
