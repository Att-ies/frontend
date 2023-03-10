import profileApi from '@apis/profile/profileApi';
import { useQuery } from 'react-query';

const useGetWish = () => {
  return useQuery<WishArtwork[], Error>(
    'useGetWish',
    () => profileApi.getWish(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetWish;
