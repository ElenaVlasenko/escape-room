import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room';

const REQUEST_TIMEOUT = 5000;

const TOKEN_HEADER = 'X-Token';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers[TOKEN_HEADER] = token;
      }
      return config;
    },
  );

  return api;
};

export default createAPI();
