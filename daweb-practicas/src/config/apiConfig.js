const API_BASE_URL = "http://localhost:8090/api";

export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  GITHUB_LOGIN: `${API_BASE_URL}/oauth2/authorization/github`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  EVENTOS_LIST: `${API_BASE_URL}/eventos/mes?inicioMes=12&año=2025`,
};
