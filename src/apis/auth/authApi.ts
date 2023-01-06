import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { AuthDTOType, DoubleCheckDTOType } from './authApi.type';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async postAuth(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/join`,
      data: body,
    });
    return data;
  }

  postAuthForQuery(body: AuthDTOType) {
    this.axios({
      method: 'POST',
      url: `http://44.193.163.114:8080/members/join`,
      data: body,
    });
  }

  async postArtistAuth(body: AuthDTOType) {
    try {
      const { data } = await this.axios({
        method: 'POST',
        url: `/members/id`,
        data: body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: any) {
      if (error) {
        return error.response.data;
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
      const { data } = await this.axios({
        method: 'POST',
        url: `/members/id`,
        data: body,
      });
      return data;
    } catch (error: any) {
      if (error) {
        return error.response.data;
      }
    }
  }

  async postNewPassword(body: AuthDTOType) {
    try {
      const { data } = await this.axios({
        method: 'POST',
        url: `/members/new-password`,
        data: body,
      });
      return data;
    } catch (error: any) {
      if (error) {
        return error.response.data;
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
