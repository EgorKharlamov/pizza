export enum ApiOrderEndpoint {
  createOrder = 'createOrder',
  getOrderById = 'getOrderById',
}

export const ApiOrderEndpoints = {
  [ApiOrderEndpoint.createOrder]: { method: 'PUT', path: 'order' },
  [ApiOrderEndpoint.getOrderById]: { method: 'GET', path: 'order' },
};

export interface ApiOrderRequestDtos {
  [ApiOrderEndpoint.createOrder]: undefined,
  [ApiOrderEndpoint.getOrderById]: undefined,
}

export interface ApiOrderResponseDtos {
  [ApiOrderEndpoint.createOrder]: undefined,
  [ApiOrderEndpoint.getOrderById]: undefined,
}
