import IPartnerRepository from '../Repositories/IPartnerRepository';
import GoodsEntity from '../Entities/GoodsEntity';
import GetGoodByIdRequest from '../Requests/GetGoodByIdRequest';

export default class GetGoodByIdUseCase {
  constructor(public partnerRepository: IPartnerRepository) {}

  async do(request: GetGoodByIdRequest): Promise<GoodsEntity | undefined> {
    try {
      const goods = await this.partnerRepository.getGoodById(request.id);
      return goods;
    } catch (e) {
      throw e;
    }
  }
}
