import { authKey } from './LocalStorage';

export const Auth = {
  setAuth: (token: string) => {
    localStorage.setItem(authKey(), token);
  },
  dropAuth: () => {
    localStorage.removeItem(authKey());
  },
  getAuthToken: () => localStorage.getItem(authKey()),
};
