import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from '@tanstack/react-query';

const useGetDetail = (artWorkId: number) => {
  return useQuery<ArtworkDetail, Error>(
    ['useGetDetail', artWorkId],
    () => artworkApi.getDetail(artWorkId),
    {
      enabled: !!artWorkId,
    },
  );
};

export default useGetDetail;
