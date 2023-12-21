// src/lib/api/index.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from '../../constants/urls';

const api = axios.create({
  baseURL: API_BASE_URL,
}) as AxiosInstance;

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type StorageAuthTokenProps = {
  token: string;
};

export async function storageAuthTokenSave({ token }: StorageAuthTokenProps) {
  localStorage.setItem("token", JSON.stringify({ token }));
}

export function storageAuthTokenGet() {
  const response = localStorage.getItem("token");

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};

  return { token };
}

export async function storageAuthTokenRemove() {
  localStorage.removeItem("token");
}

export async function callApi(config: AxiosRequestConfig): Promise<any> {
  return api(config);
}

