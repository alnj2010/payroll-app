import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(protected id: string) {}

  public execute(): void {
    const employeeRepository = EmployeeRepository.getInstance();

    employeeRepository.delete(this.id);
  }
}
