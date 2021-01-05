import PartnerEntity from './Domain/Entities/PartnerEntity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    class User extends PartnerEntity {}

    interface Request {
      user?: User;
    }
  }
}
