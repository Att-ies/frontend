import instance from '@apis/_axios/instance';

export class ProfileApi {
  async patchUserInfo(formData: any) {
    const response = await instance.patch('/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
  async patchArtistInfo(formData: any) {
    const response = await instance.patch('/artists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  async getPick(): Promise<pickList[]> {
    const { data } = await instance.get('/members/preferred-artists');
    return data;
  }
  async getPickDetail(artistId: number): Promise<artistDetail> {
    const { data } = await instance.get(`/artists/${artistId}`);
    return data;
  }
  async postPick(artistId: number) {
    await instance.post(`/members/preferred-artists/${artistId}`);
  }
  async deletePick(artistId: number) {
    await instance.delete(`/members/preferred-artists/${artistId}`);
  }
  async getInquiry(): Promise<Inquiry[]> {
    const { data } = await instance.get('/members/ask');
    return data;
  }
  async postInquiry(formData: any) {
    await instance.post('/members/ask', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  async patchInquiry(askId: number, formData: any) {
    await instance.patch(`/members/ask/${askId}`, formData);
  }
  async deleteInquiry(inquiryId: number) {
    await instance.delete(`/members/ask/${inquiryId}`);
  }
  async patchKeyword(body: any) {
    const { data } = await instance.patch('/members/keywords', body);
    return data;
  }
  async getWish(): Promise<WishArtwork[]> {
    const { data } = await instance.get('/members/preferred-artworks');
    return data;
  }
  async getNotice(): Promise<Notice[]> {
    const { data } = await instance.get('/notifications');
    return data;
  }
  async getIsNotice(): Promise<Notice> {
    const { data } = await instance.get('/notifications/new');
    return data;
  }
  async deleteNotice(id: number) {
    await instance.delete(`/notifications/${id}`);
  }
  async patchProfile(body: FormData) {
    await instance.patch('/members/certification', body);
  }
}

const profileApi = new ProfileApi();

export default profileApi;
