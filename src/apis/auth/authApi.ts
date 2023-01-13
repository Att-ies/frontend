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

  async getUserProfile(): Promise<AuthDTOType> {
    return await this.axios(`/members/me`);
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

  // async patchConvertArtist () {
  //   try{
  //     return await this.axios.patch('/artists');
  //   }catch(err){

  //   }
  // }

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
        'http://44.193.163.114:8080/members',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token.accessToken,
          },
        },
      );
      // const res = await this.axios.patch('/members', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
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

  async getCheckEmail(email: string) {
    try {
      return await this.axios(`/members/check-email?email=${email}`);
    } catch (error: any) {
      return error;
    }
  }

  async getCheckId(userId: string) {
    try {
      return await this.axios(`/members/check-id?userId=${userId}`);
    } catch (error: any) {
      return error;
    }
  }

  async getCheckNickname(nickname: string) {
    try {
      return await this.axios(`/members/check-nickname?nickname=${nickname}`);
    } catch (error: any) {
      return error;
    }
  }
}

const authApi = new AuthApi();

export default authApi;
