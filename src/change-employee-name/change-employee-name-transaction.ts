import { Employee } from '../domain/employee';
import { ChangeEmployeeTransaction } from '../change-employee-transaction/change-employee-transaction';
import { ERepository } from 'src/payroll-database/e-repository';

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
