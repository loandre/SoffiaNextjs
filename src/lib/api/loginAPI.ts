import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../constants/urls';

interface LoginResponse {
    token: string;
    user?: {
      // Inclua aqui outros campos retornados na resposta do login, se houver
      name: string;
      email: string;
      // etc.
    };
  }
  
  interface RegisterResponse {
    message: string; // ou outro campo que indique o sucesso do registro
    userId?: number; // Supondo que um ID de usuário seja retornado
    // Inclua aqui outros campos retornados na resposta do registro, se houver
  }
  
  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  };
  
  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    rg: string,
    cpf: string,
    oab: string
  ): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      phone,
      password,
      rg,
      cpf,
      oab,
    });
    return response.data;
  };
  
  const apiServices = { login, register };
  
  export default apiServices;
