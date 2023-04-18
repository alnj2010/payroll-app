import { Employee } from '../domain/employee';
import { ChangeEmployeeTransaction } from './change-employee-transaction';

export class ChangeEmployeeAddressTransaction extends ChangeEmployeeTransaction {
  constructor(id: string, private address: string) {
    super(id);
  }

  protected change(employee: Employee): void {
    employee.setAddress(this.address);
  }
}
