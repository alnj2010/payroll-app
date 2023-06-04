import { ERepository } from '../payroll-repository/e-repository';
import { Transaction } from '../transaction/transaction';

export class DeleteEmployeeTransaction implements Transaction {
  constructor(private id: string, private employeeRepository: ERepository) {}

  public execute(): void {
    this.employeeRepository.delete(this.id);
  }
}
