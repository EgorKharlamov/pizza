export default class CreatePartnerRequest {
  constructor(
    public email: string,
    public pass: string,
    public passRepeat: string,
    public phone: number
  ) {}
}
