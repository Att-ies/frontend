import axios from 'axios';
import { getToken, setToken, deleteToken } from '@utils/localStorage/token';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const setAuthorHeader = (token: string) => {
  if (token) instance.defaults.headers.common['Authorization'] = token;
};
const unsetAuthorHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

const refreshToken = async () => {
  const refresh = getToken().refreshToken;
  const token = await instance
    .post('/members/token', {
      refreshToken: refresh,
    })
    .then((res) => res.data)
    .catch((err) => {
      deleteToken();
      window.location.href = '/auth/login';
    });
  return token;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const isAccess = !!token && !!token.accessToken;
    if (isAccess) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: token.accessToken,
      };
    }
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
    const isNotFoundError = status === 404;
    const isDuplicateError = status === 409;

    if (isNotFoundError) {
      return Promise.reject(error.response.data);
    }

    if (isDuplicateError) {
      return Promise.reject(error.response.data);
    }

    if (isUnAuthError) {
      const token = await refreshToken();
      token['role'] = getToken().role;
      token['refreshToken'] = getToken().refreshToken;
      if (token?.accessToken) {
        setToken(token);
        setAuthorHeader(token.accessToken);
        reqData.headers.Authorization = token?.access;
        return instance(reqData);
      }
    }
  },
);

export { setAuthorHeader, unsetAuthorHeader };

export default instance;
