import { NonFunctionProperties } from '../types';

export default abstract class BaseEntity<T> {
  static new<T>(this: new () => T, params: NonFunctionProperties<T>): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.assign(new this() as unknown, params);
  }
}
