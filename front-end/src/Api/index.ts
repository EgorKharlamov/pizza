import UrlPattern from 'url-pattern';
import ky from 'ky';
import {
  ApiPartnerEndpoint, ApiPartnerEndpoints, ApiPartnerRequestDtos, ApiPartnerResponseDtos,
} from './partner';
import {
  ApiOrderEndpoint, ApiOrderEndpoints, ApiOrderRequestDtos, ApiOrderResponseDtos,
} from './order';
import { Auth } from '../Helpers/LocalStorage/Auth';

const API_SERVER = process.env.NODE_ENV !== 'development' ? 'http://localhost:2310/' : process.env.REACT_APP_API_URL;

export type ApiEndpoint = ApiPartnerEndpoint | ApiOrderEndpoint
export type ApiRequestDtos = ApiPartnerRequestDtos & ApiOrderRequestDtos
export type ApiResponseDtos = ApiPartnerResponseDtos & ApiOrderResponseDtos
export const ApiEndpoints = Object.assign(ApiPartnerEndpoints, ApiOrderEndpoints);

const jsonObjectToArray = (json: any) => {
  const result: any = [];
  for (const key in json) {
    if (json[key] instanceof Array) {
      json[key].forEach((el: any) => result.push([key, el]));
    } else {
      result.push([key, json[key]]);
    }
  }
  return result;
};

export default async function requester<E extends ApiEndpoint>(endpoint: E,
  json?: ApiRequestDtos[E]): Promise<ApiResponseDtos[E]> {
  const { method } = ApiEndpoints[endpoint];
  const { path } = ApiEndpoints[endpoint];
  const param = method == 'GET' ? 'searchParams' : 'json';

  const pattern:any = new UrlPattern(path);
  const dto:any = json;
  const data: any = {};
  for (const name of pattern.names) {
    data[name] = dto[name];
    delete dto[name];
  }
  const jsonModified = method == 'GET' && json && jsonObjectToArray(json) || json;
  const pathModified = pattern.stringify(data);

  return ky(pathModified, {
    method,
    [param]: jsonModified,
    prefixUrl: API_SERVER,
    hooks: {
      beforeRequest: [
        async (request) => {
          const token = Auth.getAuthToken();
          if (token) {
            request.headers.set('Authorization',
              `Bearer ${token}`);
          }
        },
      ],
    },
  }).json();
}
