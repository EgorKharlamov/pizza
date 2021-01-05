import { NonFunctionProperties } from '../types';

export default abstract class BaseEntity<T> {
  static new<T>(this: new () => T, params: NonFunctionProperties<T>): T {
    return Object.assign(new this(), params);
  }
}
