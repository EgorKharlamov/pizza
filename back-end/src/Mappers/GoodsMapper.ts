import GoodsOrm from '../Orm/Goods.orm';
import GoodsEntity from '../Domain/Entities/GoodsEntity';
import GoodsDto from '../Dtos/Objects/GoodsDto';

export default class GoodsMapper {
  static ormToDomain(orm: GoodsOrm): GoodsEntity {
    return GoodsEntity.new({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      price: orm.price,
      difficult: orm.difficult,
      inStock: orm.in_stock,
      timeToOrder: orm.time_to_order,
      orderTimes: orm.order_times,
      imageUrl: orm.image_url,
    });
  }

  static domainToDto(good: GoodsEntity): GoodsDto {
    return {
      id: good.id as number,
      name: good.name,
      description: good.description,
      price: good.price,
      difficult: good.difficult,
      inStock: good.inStock,
      timeToOrder: good.timeToOrder,
      orderTimes: good.orderTimes,
      imageUrl: good.imageUrl,
    };
  }
}
