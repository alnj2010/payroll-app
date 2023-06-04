import { Employee } from '../payroll-domain/employee';
import { ChangeEmployeeTransaction } from '../abstract-transaction/change-employee-transaction';
import { ERepository } from '../payroll-repository/e-repository';

export class ChangeEmployeeNameTransaction extends ChangeEmployeeTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private name: string,
  ) {
    super(id, employeeRepository);
  }

  protected change(employee: Employee): void {
    employee.setName(this.name);
  }
}
