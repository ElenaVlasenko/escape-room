import { ServerRoute } from '../const';
import { AuthParams, User } from '../types';
import api from './api';
import { dropToken, saveToken } from './token';

export const userApi = {
  // async signUp(params: SignUpParams): Promise<User> {
  //   // throw Error;
  //   const { data } = await api.post<User>(ServerRoute.Registration, params);
  //   return data;
  // },
  async login(params: AuthParams): Promise<User> {
    // throw Error;
    const { data } = await api.post<User>(ServerRoute.LogIn, params);
    saveToken(data.token);
    return data;
  },
  async logout() {
    try {

      await api.delete<User>(ServerRoute.Logout);
    } finally {
      dropToken();
    }
  },
  async getAuthorizedUser(): Promise<User> {

    try {
      const { data } = await api.get<User>(ServerRoute.LogIn);
      saveToken(data.token);
      return data;
    } catch (err) {
      dropToken();
      throw err;
    }
  }
} as const;

export type UserApi = typeof userApi;
