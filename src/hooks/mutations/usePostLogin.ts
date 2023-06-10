import authApi from '@apis/auth/authApi';
import { Token } from '@utils/localStorage/token';
import { useMutation } from '@tanstack/react-query';

interface LoginResponse extends Token {
  refreshToken: string;
}

const usePostLogin = () => {
  return useMutation<LoginResponse, Error, Login>(
    ['useLoginMuation'],
    (data) => authApi.postLogin(data),
    {
      useErrorBoundary: false,
    },
  );
};
export default usePostLogin;
