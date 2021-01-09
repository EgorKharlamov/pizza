export const cartKey = () => 'cart';
export const existedCart = () => localStorage.getItem(cartKey());

export const authKey = () => 'auth';
export const getAuth = () => localStorage.getItem(authKey());

export const themeKey = () => 'theme';
export const getTheme = () => localStorage.getItem(themeKey());
