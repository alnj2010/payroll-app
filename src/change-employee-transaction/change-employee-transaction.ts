import { Employee } from '../domain/employee';
import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';

export abstract class ChangeEmployeeTransaction implements Transaction {
  constructor(private id: string) {}
  protected abstract change(employee: Employee): void;

  public execute(): void {
    try {
      const employeeRepository = EmployeeRepository.getInstance();
      const employee = employeeRepository.read(this.id);
      this.change(employee);
    } catch (error) {
      throw error;
    }
  }
}
