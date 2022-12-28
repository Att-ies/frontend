import axios from 'axios';
import { getToken, setToken, deleteToken } from '@utils/localStorage/token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthorHeader = (token: string) => {
  if (token)
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const unsetAuthorHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

const refreshToken = async () => {
  const refresh = getToken().refresh;
  // refresh token api 호출
  const token = await instance
    .post('/v1/users/token/refresh', {
      refresh: refresh,
    })
    .then((res) => res.data);
  return token;
};

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    const isAccess = !!token && !!token.access;
    if (isAccess) setAuthorHeader(token.access as string);
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { response: res, config: reqData } = error || {};
    const { status } = res || {};
    const isUnAuthError = status === 401;
    const isExpiredToken = status === 444;

    if (isExpiredToken) {
      const token = await refreshToken();
      if (token?.access) {
        setToken(token);
        setAuthorHeader(token.access);
        reqData.headers.Authorization = `Bearer ${token?.access}`;
        return instance(reqData);
      }
    }

    if (isUnAuthError) {
      deleteToken();
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
  },
);

export { setAuthorHeader, unsetAuthorHeader };

export default instance;
