let isLocalhost = false;

if (typeof window !== "undefined") {
  // window está definido, estamos no lado do cliente
  isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

export const API_BASE_URL = isLocalhost ? 'http://localhost:3000/' : 'https://api.soffia.pro/';

export const LOGIN = 'auth/login';
export const CREATE_CLIENT_ENDPOINT = 'client';

export const GET_ALL_SCHEDULE = 'schedule';
