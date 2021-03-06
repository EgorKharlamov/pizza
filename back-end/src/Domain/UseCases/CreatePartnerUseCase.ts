import IPartnerRepository from '../Repositories/IPartnerRepository';
import CreatePartnerRequest from '../Requests/CreatePartnerRequest';
import PartnerEntity from '../Entities/PartnerEntity';
import DomainValidationError, {
  DomainValidationErrorTypes,
} from '../Errors/DomainValidationError';

export default class CreatePartnerUseCase {
  constructor(public userRepository: IPartnerRepository) {}

  async do(request: CreatePartnerRequest): Promise<PartnerEntity> {
    try {
      await this.validate(request);
      const passHash = PartnerEntity.hashPassword(request.pass);
      return this.userRepository.createUser(
        request.email,
        passHash,
        request.phone
      );
    } catch (e) {
      throw e;
    }
  }

  async validate(request: CreatePartnerRequest) {
    if (request.pass !== request.passRepeat) {
      throw new DomainValidationError(
        DomainValidationErrorTypes.notEqual,
        'pass',
        'not equal password and password repeat'
      );
    }
    const user = await this.userRepository.findUserByEmail(request.email);
    if (user) {
      throw new DomainValidationError(
        DomainValidationErrorTypes.exists,
        'user',
        'User exists!'
      );
    }
  }
}
