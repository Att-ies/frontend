import instance from '@apis/_axios/instance';
import { AxiosInstance } from 'axios';
import { AuthDTOType, DoubleCheckDTOType } from './authApi.type';
import { getToken } from '@utils/localStorage/token';
import axios from 'axios';
export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async postUserAuth(body: AuthDTOType) {
    await instance.post('/members/join', body);
  }

  async getUserProfile() {
    const res = await instance(`/members/me`);
    return res;
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

  async postFindId(body: string) {
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

  async patchUserInfo(formData: any) {
    try {
      const token = getToken();
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/members`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token.accessToken,
          },
        },
      );
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

  async getDuplicateCheck(params) {
    const type = params.queryKey[0];
    const data = params.queryKey[1];
    console.log(type, data);
    let uri = '';
    if (type === 'email') {
      uri = '/members/check-email?email=';
    } else if (type === 'id') {
      uri = '/members/check-id?userId=';
    } else if (type === 'nickname') {
      uri = '/members/check-nickname?nickname=';
    }
    const res = await instance(`${uri}${data}`);
    return res;
  }

  async getCheckEmail(email: string) {
    const res = await this.axios(`/members/check-email?email=${email}`);
    return res;
  }

  async getCheckId(userId: string) {
    try {
      const res = await this.axios(`/members/check-id?userId=${userId}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }

  async getCheckNickname(nickname: string) {
    try {
      const res = await this.axios(
        `/members/check-nickname?nickname=${nickname}`,
      );
      return res;
    } catch (error: any) {
      return error;
    }
  }

  async patchRole() {
    try {
      const res = await this.axios.patch('/members/roles');
      return res;
    } catch (error: any) {
      return error;
    }
  }
}

const authApi = new AuthApi();

export default authApi;
