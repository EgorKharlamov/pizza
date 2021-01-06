export type UniqueIdentifier = string | number;

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export enum Order {
  maxToMin = 'DESC',
  minToMax = 'ASC',
}
