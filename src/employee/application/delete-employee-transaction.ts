import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(protected id: string) {}

  public execute(): void {
    EmployeeRepository.delete(this.id);
  }
}
