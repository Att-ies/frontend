import { CONFIG } from '@config';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: CONFIG.API_BASE_URL,
});

const refreshToken = async () => {
  const refreshToken = getCookie('refreshToken');
  const response = await axios.post(`${CONFIG.API_BASE_URL}/members/token`, {
    refreshToken,
  });
  return response.data;
};

instance.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: getCookie('accessToken'),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config: originalRequest, response } = error;
    const { status, data } = response;
    const isUnAuthError = status === 401;
    const isNotFoundError = status === 404;
    const isDuplicateError = status === 409;

    if (isNotFoundError) {
      return Promise.reject(error.response.data);
    }

    if (isDuplicateError) {
      return Promise.reject(error.response.data);
    }

    if (isUnAuthError) {
      if (data?.code === 'TOKEN_EXPIRED') {
        const { accessToken } = await refreshToken();
        setCookie('accessToken', accessToken);
        return instance.request(originalRequest);
      }
      if (data?.code === 'TOKEN_INVALID') {
        window.location.href = `${CONFIG.LOCAL}/auth/login`;
        alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
        return;
      }

      return Promise.reject(error.response.data);
    }
  },
);

export default instance;
