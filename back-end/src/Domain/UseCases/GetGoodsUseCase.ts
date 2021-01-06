import IPartnerRepository from '../Repositories/IPartnerRepository';
import GoodsEntity from '../Entities/GoodsEntity';

export default class GetGoodsUseCase {
  constructor(public partnerRepository: IPartnerRepository) {}

  async do(): Promise<GoodsEntity[]> {
    try {
      const goods = await this.partnerRepository.getGoods();
      return goods;
    } catch (e) {
      throw e;
    }
  }
}
