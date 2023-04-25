import { Employee } from '../domain/employee';
import { Paycheck } from '../domain/paycheck';
import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';

export class PaydayTransaction implements Transaction {
  private paychecks = new Map<string, Paycheck>();
  constructor(private date: string) {}

  public getPaychecks(): Map<string, Paycheck> {
    return this.paychecks;
  }

  public execute(): void {
    const employees: Employee[] = EmployeeRepository.readAll();
    employees.forEach((employee) => {
      if (employee.isPayDay(this.date)) {
        const paycheck = employee.payDay(this.date);

        this.paychecks.set(employee.getId(), paycheck);
      }
    });
  }
}
