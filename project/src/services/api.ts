import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig }  from 'axios';
import { BACKEND_URL, HttpCode } from '../utils/const';
import { getToken } from './token';
import { toast } from 'react-toastify';

const REQUEST_TIMEOUT = 5000;

type UnauthorizedCallback = () => void;

export const createAPI = (
  onUnauthorized: UnauthorizedCallback,
  useToastInterceptor = true,
): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  if (useToastInterceptor) {
    api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const { response } = error;

        if (response?.status !== HttpCode.Unauthorized) {
          response?.data.error
            ? toast.error(response?.data.error)
            : toast.error('A network error occurred');
        }

        return Promise.reject(error);
      },
    );
  }

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
