export enum GoodsDifficultType {
  veryLow,
  low,
  medium,
  hard,
  veryHard,
}

export enum TimeToOrderType {
  morning,
  afternoon,
  evening,
}

export interface IGoodsState {
  list: IGoods[]
  chosen: IGoods | undefined
}

export default interface IGoods {
  id: number
  name: string
  description: string
  price: number
  difficult: GoodsDifficultType
  inStock: boolean
  timeToOrder: TimeToOrderType
  orderTimes: number
  imageUrl: string
}
