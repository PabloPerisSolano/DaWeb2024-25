const BASE_API = "http://localhost:8090/api/";

const BASE_AUTH = `${BASE_API}auth/`;
const BASE_OAUTH2 = `${BASE_API}oauth2/`;

const BASE_ESPACIOS = `${BASE_API}espacios/`;
const BASE_EVENTOS = `${BASE_API}eventos/`;
const BASE_RESERVAS = `${BASE_API}reservas/`;

const MAX_ELEMENTS_PAGED = 2000;

export const API_ROUTES = {
  LOGIN: `${BASE_AUTH}login`,
  LOGOUT: `${BASE_AUTH}logout`,

  GITHUB_LOGIN: `${BASE_OAUTH2}authorization/github`,

  ESPACIOS: BASE_ESPACIOS,
  ESPACIOS_LIBRES: (fechaIni, fechaFin, capacidad) =>
    `${BASE_ESPACIOS}libres?fechaIni=${fechaIni}&fechaFin=${fechaFin}&capacidad=${capacidad}`,
  ESPACIO_ID: (idEspacio) => `${BASE_ESPACIOS}${idEspacio}`,
  ESPACIO_ESTADO: (idEspacio) => `${BASE_ESPACIOS}${idEspacio}/estado`,

  EVENTOS: BASE_EVENTOS,
  EVENTOS_LISTADO: `${BASE_EVENTOS}?size=${MAX_ELEMENTS_PAGED}`,
  EVENTO_ID: (idEvento) => `${BASE_EVENTOS}${idEvento}`,
  EVENTO_OCUPACION: (idEvento) => `${BASE_EVENTOS}${idEvento}/ocupacion`,

  RESERVAS: BASE_RESERVAS,
  RESERVAS_MIAS: `${BASE_RESERVAS}me?size=${MAX_ELEMENTS_PAGED}&sort=idEvento`,
  RESERVA: (idReserva) => `${BASE_RESERVAS}${idReserva}`,
};
