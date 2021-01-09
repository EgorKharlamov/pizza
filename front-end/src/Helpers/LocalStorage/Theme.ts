import { ThemeType } from '../../types';
import { themeKey } from './LocalStorage';

export const Theme = {
  setTheme: (theme: ThemeType | string) => {
    localStorage.setItem(themeKey(), theme);
  },
  getTheme: () => localStorage.getItem(themeKey()),
};
