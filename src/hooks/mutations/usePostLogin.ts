import authApi from '@apis/auth/authApi';
import { Token } from '@utils/localStorage/token';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

interface LoginResponse extends Token {
  refreshToken: string;
  accessToken: string;
}

const usePostLogin = () => {
  const router = useRouter();
  return useMutation<LoginResponse, Error, Login>(
    ['useLoginMuation'],
    (data) => authApi.postLogin(data),
    {
      useErrorBoundary: false,
      onSuccess: (data) => {
        setCookie('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken);
        if (data.roles === 'ROLE_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/home');
        }
      },
    },
  );
};
export default usePostLogin;
