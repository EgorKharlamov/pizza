import ISignUpDto from './Dto/Requests/SignUpDto';
import ISignInDto from './Dto/Requests/SignInDto';
import IGetGoodByIdDto from './Dto/Requests/GetGoodByIdDto';

export enum ApiPartnerEndpoint {
  signIn = 'signIn',
  profile = 'profile',
  signUp = 'signUp',
  getGoods = 'getGoods',
  getGoodById = 'getGoodById'
}

export const ApiPartnerEndpoints = {
  [ApiPartnerEndpoint.signIn]: { method: 'POST', path: 'user/signIn' },
  [ApiPartnerEndpoint.profile]: { method: 'GET', path: 'user' },
  [ApiPartnerEndpoint.signUp]: { method: 'PUT', path: 'user/signUp' },
  [ApiPartnerEndpoint.getGoods]: { method: 'GET', path: 'user/goods' },
  [ApiPartnerEndpoint.getGoodById]: { method: 'GET', path: 'user/goods/:id' },
};

export interface ApiPartnerRequestDtos {
  [ApiPartnerEndpoint.signIn]: ISignInDto
  [ApiPartnerEndpoint.profile]: undefined
  [ApiPartnerEndpoint.signUp]: ISignUpDto
  [ApiPartnerEndpoint.getGoods]: undefined
  [ApiPartnerEndpoint.getGoodById]: IGetGoodByIdDto
}

export interface ApiPartnerResponseDtos {
  [ApiPartnerEndpoint.signIn]: undefined
  [ApiPartnerEndpoint.profile]: undefined
  [ApiPartnerEndpoint.signUp]: undefined
  [ApiPartnerEndpoint.getGoods]: undefined
  [ApiPartnerEndpoint.getGoodById]: undefined
}
