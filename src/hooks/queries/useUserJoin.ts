import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import instance from '@apis/_axios/instance';

const useUserJoin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const mutation = useMutation(
    async () => {
      await instance.post('/members/join', body);
    },
    {
      onSuccess: (res) => {
        router.push('/auth/login');
      },
      onError: (error: any) => {
        const response = error.response;
        if (response.status === 200) {
          router.push('/auth/login');
        } else if (response.status === 409) {
          switch (response.data.code) {
            case 'EXIST_USER_ID':
              setErrorMessage('존재하는 아이디입니다.');
              break;
            case 'EXIST_USER_EMAIL':
              setErrorMessage('존재하는 이메일입니다.');
              break;
            case 'EXIST_NICKNAME':
              setErrorMessage('존재하는 닉네임입니다.');
              break;
          }
        }
      },
    },
  );
  return { mutation, errorMessage };
};

export default useUserJoin;
