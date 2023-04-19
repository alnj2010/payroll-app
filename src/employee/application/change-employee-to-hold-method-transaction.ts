import { HoldMethod } from '../domain/hold-method';
import { PaymentMethod } from '../domain/payment-method';
import { ChangeEmployeeMethodTransaction } from './change-employee-method-transaction';

export class ChangeEmployeeToHoldMethodTransaction extends ChangeEmployeeMethodTransaction {
  constructor(id: string) {
    super(id);
  }
  protected getMethod(): PaymentMethod {
    return new HoldMethod();
  }
}
