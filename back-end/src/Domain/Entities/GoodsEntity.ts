import BaseEntity from './BaseEntity';
import { UniqueIdentifier } from '../types';

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

export default class GoodsEntity extends BaseEntity<GoodsEntity> {
  readonly id: UniqueIdentifier;
  name: string;
  description: string;
  price: number;
  difficult: GoodsDifficultType;
  inStock: boolean;
  timeToOrder: TimeToOrderType;
  orderTimes: number;
  imageUrl: string;
}
