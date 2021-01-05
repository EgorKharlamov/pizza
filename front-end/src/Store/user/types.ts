export interface IUser {
  id?: number
  email: string
  name?: string
  phone?: number
  address?: {
    street: string
    building: string
    room?: string
  }
}
