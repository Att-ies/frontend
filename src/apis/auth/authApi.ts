import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { AuthDTOType, DoubleCheckDTOType } from './authApi.type';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async postAuth(body: AuthDTOType) {
    try {
      const res = await this.axios({
        method: 'POST',
        url: `/members/join`,
        data: body,
      });
      return res;
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postArtistAuth(body: AuthDTOType) {
    try {
      const res = await this.axios({
        method: 'POST',
        url: `/artists/join`,
        data: body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postLogin(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/login`,
      data: body,
    });
    return data;
  }

  async postAccessToken(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/token`,
      data: body,
    });
    return data;
  }

  async postFindId(body: AuthDTOType) {
    try {
      const res = await this.axios({
        method: 'POST',
        url: `/members/id`,
        data: body,
      });
      return res;
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postNewPassword(body: AuthDTOType) {
    try {
      const res = await this.axios({
        method: 'POST',
        url: `/members/new-password`,
        data: body,
      });
      return res;
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async patchLogout(): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/members/logout`,
    });
    return data;
  }

  async getCheckEmail(email): Promise<DoubleCheckDTOType> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/members/check-email?email=${email}`,
    });
    return data;
  }

  async getCheckId(userId): Promise<DoubleCheckDTOType> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/members/check-id?userId=${userId}`,
    });
    return data;
  }
}

const authApi = new AuthApi();

export default authApi;
