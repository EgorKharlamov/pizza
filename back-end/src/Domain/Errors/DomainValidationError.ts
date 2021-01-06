export enum DomainValidationErrorTypes {
  required = 'required',
  exists = 'exists',
  notEqual = 'notEqual',
}

export default class DomainValidationError {
  constructor(
    public type: DomainValidationErrorTypes,
    public param: string,
    public message: string = ''
  ) {}
}
