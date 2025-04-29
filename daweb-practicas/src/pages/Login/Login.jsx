import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaSignInAlt } from "react-icons/fa";
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
      } else {
        alert("Error al iniciar sesión.");
      }
    } catch (error) {
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
        <h2 className="mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <section className="mb-3">
            <label htmlFor="username" className="form-label">
              Nombre de Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </section>
          <section className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </section>
          <button
            type="submit"
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <FaSignInAlt />
            Iniciar Sesión
          </button>
        </form>

        <div className="d-flex align-items-center my-2">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">o</span>
          <hr className="flex-grow-1" />
        </div>

        <button
          onClick={handleGithubLogin}
          className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FaGithub className="button-icon" />
          Continuar con GitHub
        </button>
      </div>
    </div>
  );
}

export default Login;
