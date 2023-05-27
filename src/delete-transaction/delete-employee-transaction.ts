import { ERepository } from 'src/payroll-database/e-repository';
import { Transaction } from '../domain/transaction';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(private id: string, private employeeRepository: ERepository) {}

  public execute(): void {
    this.employeeRepository.delete(this.id);
  }
}
