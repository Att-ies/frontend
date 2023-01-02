import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { AuthDTOType } from './authApi.type';

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

  async postLogin(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/login`,
      data: body,
    });
    return data;
  }

  async getNaverLogin(): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/oauth2/authorization/naver`,
    });
    return data;
  }

  async getKakaoLogin(): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/oauth2/authorization/kakao`,
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

  async postFindId(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/id`,
      data: body,
    });
    return data;
  }

  async postNesPassword(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/new-password`,
      data: body,
    });
    return data;
  }

  async patchLogout(): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/members/logout`,
    });
    return data;
  }

  async postCheckEmail(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/check-email`,
      data: body,
    });
    return data;
  }

  async postChcekId(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/members/check-id`,
      data: body,
    });
    return data;
  }
}

const authApi = new AuthApi();

export default authApi;
