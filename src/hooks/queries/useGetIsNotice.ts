import profileApi from '@apis/profile/profileApi';
import { useQuery } from 'react-query';

const useGetIsNotice = () => {
  return useQuery<Notice, Error>(
    'useGetIsNotice',
    () => profileApi.getIsNotice(),
    {
      retry: false,
    },
  );
};

export default useGetIsNotice;
