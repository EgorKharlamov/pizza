import CreateOrderRequest from '../Requests/CreateOrderRequest';
import OrderEntity from '../Entities/OrderEntity';
import IOrderRepository from '../Repositories/IOrderRepository';

export default class CreateOrderUseCase {
  constructor(public orderRepository: IOrderRepository, public user: any) {}

  async do(request: CreateOrderRequest): Promise<OrderEntity> {
    try {
      const order = await this.orderRepository.createOrder(
        request.pizzas,
        request?.address,
        request.phone,
        request.email,
        request.comment,
        this.user.id
      );
      return order;
    } catch (e) {
      throw e;
    }
  }
}
