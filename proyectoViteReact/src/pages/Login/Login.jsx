import "./Login.css";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { FaGithub, FaSignInAlt } from "react-icons/fa";
import { API_ROUTES, fetchWithAuth } from "@/api/api";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const { handleLogin } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetchWithAuth(API_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        handleLogin({
          idUsuario: data.idUsuario,
          roles: data.roles,
        });
      } else {
        showToast(`Error: ${response.status} - ${data.error}`, "error");
      }
    } catch (error) {
      showToast("Error de conexión", "error");
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
      if (event.origin !== "http://localhost:8090") return;

      if (event.data?.token) {
        handleLogin({
          idUsuario: event.data.idUsuario,
          roles: event.data.roles,
        });

        if (popup) popup.close();
      } else if (event.data?.error) {
        showToast(event.data.error, "error");
        if (popup) popup.close();
      }
      window.removeEventListener("message", messageListener);
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
