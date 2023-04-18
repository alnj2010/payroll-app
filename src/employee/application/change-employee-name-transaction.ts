import { Employee } from '../domain/employee';
import { ChangeEmployeeTransaction } from './change-employee-transaction';

export class ChangeEmployeeNameTransaction extends ChangeEmployeeTransaction {
  constructor(id: string, private name: string) {
    super(id);
  }

  protected change(employee: Employee): void {
    employee.setName(this.name);
  }
}
