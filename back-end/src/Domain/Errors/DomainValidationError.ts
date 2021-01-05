export enum DomainValidationErrorTypes {
  required = 'required',
  exists = 'exists',
}

export default class DomainValidationError {
  constructor(
    public type: DomainValidationErrorTypes,
    public param: string,
    public message: string = ''
  ) {}
}
