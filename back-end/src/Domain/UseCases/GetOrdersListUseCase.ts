import OrderEntity from '../Entities/OrderEntity';
import IOrderRepository from '../Repositories/IOrderRepository';
import GetOrdersListRequest from '../Requests/GetOrdersListRequest';

export default class GetOrdersListUseCase {
  constructor(public orderRepository: IOrderRepository) {}

  async do(request: GetOrdersListRequest): Promise<OrderEntity[]> {
    try {
      const orders = await this.orderRepository.getOrders(
        request.userId,
        request.page,
        request.limit,
        request.sort,
        request.filter
      );
      return orders;
    } catch (e) {
      throw e;
    }
  }
}
