import { PaymentMethod } from './payment-method';

export class DirectMethod extends PaymentMethod {
  constructor(private bank: string, private account: string) {
    super();
  }
  public getBank(): string {
    return this.bank;
  }

  public getAccount(): string {
    return this.account;
  }
}
