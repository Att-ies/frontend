import instance from '@apis/_axios/instance';
import { AxiosInstance } from 'axios';

import { AuthDTOType, DoubleCheckDTOType } from './authApi.type';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async postUserAuth(body: AuthDTOType) {
    await instance.post('/members/join', body);
  }

  async getUserProfile() {
    return await this.axios(`/members/me`);
  }

  async postArtistAuth(body: AuthDTOType) {
    try {
      return await this.axios.post('/artists/join', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postLogin(body: AuthDTOType) {
    try {
      return await this.axios.post('/members/login', body);
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postAccessToken(body: AuthDTOType): Promise<AuthDTOType> {
    const { data } = await this.axios.post('/members/token', body);
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

  async postPassword(password: string) {
    try {
      return await this.axios.patch(`/members/password`, {
        password,
      });
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async postLogout() {
    await this.axios.post('/members/logout');
  }

  async patchUserInfo(data: any) {
    try {
      const res = await this.axios.patch('/members', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  }

  async deleteUser() {
    try {
      const res = await this.axios.delete('DELETE', '/members');
      return res;
    } catch (error: any) {
      if (error) {
        return error.response;
      }
    }
  }

  async getCheckEmail(email) {
    try {
      const { data } = await this.axios(`/members/check-email?email=${email}`);
      return data;
    } catch (error: any) {
      return error.response;
    }
  }

  async getCheckId(userId): Promise<DoubleCheckDTOType> {
    try {
      const { data } = await this.axios(`/members/check-id?userId=${userId}`);
      return data;
    } catch (error: any) {
      return error.response;
    }
  }

  async getCheckNickname(nickname) {
    try {
      const { data } = await this.axios(
        `/members/check-nickname?nickname=${nickname}`,
      );
      return data;
    } catch (error: any) {
      return error.response;
    }
  }
}

const authApi = new AuthApi();

export default authApi;
