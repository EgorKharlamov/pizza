export interface IUserState {
  id: number
  email: string
  name?: string
  phone?: string
  address?: IAddress
  currency: ICurrency
}

export interface IAddress {
  street: string
  building: string
  room: string
}

export interface ICurrency {
  current: CurrencyType,
  coefficient: number
}

export enum CurrencyType {
  dollar = '$',
  euro = '€'
}
