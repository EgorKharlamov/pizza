export enum routesStatic {
  home = '/',
  order = '/order',
  ordersHistory = '/order/history',
  goods = '/goods'
}

export enum ThemeType {
  light = 'light',
  dark = 'dark'
}

export enum ModalsType {
  signInModal = 'signInModal',
  signUpModal = 'signUpModal',
  formOrderModal = 'formOrderModal',
}

export enum InputErrorType {
  error,
  success
}

export type UniqueIdentifier = string | number;
