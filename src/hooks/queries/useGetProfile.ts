import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import authApi from '@apis/auth/authApi';
import { useState } from 'react';

const useGetProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const { isLoading, data } = useQuery(
    'useGetProfile',
    authApi.getUserProfile,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setUserInfo(res.data);
      },
      onError: (error: any) => {
        return error;
      },
    },
  );
  return { isLoading, data, userInfo };
};

export default useGetProfile;
