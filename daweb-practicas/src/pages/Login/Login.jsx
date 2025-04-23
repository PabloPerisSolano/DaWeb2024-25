import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaGithub } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/gestor");

    // try {
    //   const response = await fetch("URL_DEL_BACKEND_ARSO/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     localStorage.setItem("token", data.token);
    //     window.location.href = "/dashboard";
    //   } else {
    //     alert(data.message || "Error al iniciar sesión");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Error de conexión");
    // }
  };

  const handleGithubLogin = () => {
    // Redirige al endpoint de autenticación de GitHub de tu backend
    window.location.href = "URL_DEL_BACKEND_ARSO/auth/github";
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
