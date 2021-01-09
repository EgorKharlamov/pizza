export interface IUserState {
  id: number
  email: string
  name?: string
  phone?: string
  address?: IAddress
}

export interface IAddress {
  street: string
  building: string
  room: string
}
