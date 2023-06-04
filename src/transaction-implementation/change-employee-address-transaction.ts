import { Employee } from '../payroll-domain/employee';
import { ChangeEmployeeTransaction } from '../abstract-transaction/change-employee-transaction';
import { ERepository } from '../payroll-repository/e-repository';

export class ChangeEmployeeAddressTransaction extends ChangeEmployeeTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private address: string,
  ) {
    super(id, employeeRepository);
  }

  protected change(employee: Employee): void {
    employee.setAddress(this.address);
  }
}
