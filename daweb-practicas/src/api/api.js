const API_BASE = "http://localhost:8090/api/";
const MAX_ELEMENTS_PAGED = 2000;

export const API_ROUTES = {
  LOGIN: `auth/login`,
  GITHUB_LOGIN: `oauth2/authorization/github`,
  LOGOUT: `auth/logout`,
  EVENTOS_LISTADO: `eventos?size=${MAX_ELEMENTS_PAGED}&sort=cancelado`,
  EVENTOS: `eventos`,
  RESERVAS_MIAS: `reservas/me?size=${MAX_ELEMENTS_PAGED}&sort=idEvento`,
  RESERVAS: `reservas`,
};

export const fetchWithAuth = (url, options = {}) => {
  const headers = {
    ...(options.headers || {}),
  };

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`${API_BASE}${url}`, {
    ...options,
    credentials: "include",
    headers,
  });
};
