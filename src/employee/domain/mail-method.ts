import { PaymentMethod } from './payment-method';

export class MailMethod extends PaymentMethod {
  constructor(private mail: string) {
    super();
  }
  public getMail(): string {
    return this.mail;
  }
}
