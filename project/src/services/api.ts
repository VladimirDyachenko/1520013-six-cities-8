import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig }  from 'axios';
import { BACKEND_URL, HttpCode } from '../utils/const';
import { getToken } from './token';

const REQUEST_TIMEOUT = 5000;

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorize: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorize();
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (requestConfig: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        requestConfig.headers['x-token'] = token;
      }

      return requestConfig;
    },
  );

  return api;
};
