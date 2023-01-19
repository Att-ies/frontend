import instance from '@apis/_axios/instance';
import { getToken } from '@utils/localStorage/token';
import { ArtworkDTOType } from './artworkApi.type';

export class ArtworkApi {
  async postArtwork(body: ArtworkDTOType): Promise<ArtworkDTOType> {
    const token = getToken();
    const { data } = await instance.post('/art-works', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token.accessToken,
      },
    });
    return data;
  }
}

const artworkApi = new ArtworkApi();

export default artworkApi;
