import { ERepository } from '../payroll-repository/e-repository';
import { Employee } from '../payroll-domain/employee';
import { Transaction } from '../transaction/transaction';

export abstract class ChangeEmployeeTransaction implements Transaction {
  constructor(private id: string, private employeeRepository: ERepository) {}
  protected abstract change(employee: Employee): void;

  public execute(): void {
    try {
      const employee = this.employeeRepository.read(this.id);
      this.change(employee);
    } catch (error) {
      throw error;
    }
  }
}
