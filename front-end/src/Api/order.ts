import GetOrdersListDto from './Dto/Requests/GetOrdersListDto';
import { IOrderDto } from './Dto/Objects/IOrderDto';

export enum ApiOrderEndpoint {
  createOrder = 'createOrder',
  getOrdersList = 'getOrdersList',
}

export const ApiOrderEndpoints = {
  [ApiOrderEndpoint.createOrder]: { method: 'PUT', path: 'order' },
  [ApiOrderEndpoint.getOrdersList]: { method: 'GET', path: 'order' },
};

export interface ApiOrderRequestDtos {
  [ApiOrderEndpoint.createOrder]: IOrderDto,
  [ApiOrderEndpoint.getOrdersList]: GetOrdersListDto,
}

export interface ApiOrderResponseDtos {
  [ApiOrderEndpoint.createOrder]: undefined,
  [ApiOrderEndpoint.getOrdersList]: undefined,
}
