import { Employee } from '../domain/employee';
import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';

export abstract class ChangeEmployeeTransaction implements Transaction {
  constructor(private id: string) {}
  protected abstract change(employee: Employee): void;

  public execute(): void {
    try {
      const employee = EmployeeRepository.read(this.id);
      this.change(employee);
    } catch (error) {
      throw error;
    }
  }
}
