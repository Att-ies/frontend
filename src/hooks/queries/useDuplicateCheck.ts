import { useQuery } from 'react-query';
import authApi from '@apis/auth/authApi';
import { useState } from 'react';

interface ErrorForm {
  id: '';
  email: '';
  nickname: '';
}

const useDuplicateCheck = (type: string, data: string) => {
  const [errorMessage, setErrorMessage] = useState<ErrorForm>({});
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const query = useQuery([type, data], authApi.getDuplicateCheck, {
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (res: any) => {
      console.log(res);
      return res;
    },
    onError: (error: any) => {
      if (error.status === 409) {
        setErrorMessage();
        return error;
      }
    },
  });
  return { ...query, isDuplicate, errorMessage };
};

export default useDuplicateCheck;
