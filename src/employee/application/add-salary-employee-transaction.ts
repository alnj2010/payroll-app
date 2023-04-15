import { Employee } from '../domain/employee';
import { HoldMethod } from '../domain/hold-method';
import { MonthlyScheduler } from '../domain/monthly-scheduler';
import { SalaryClassification } from '../domain/salary-classification';
import { Transaction } from '../domain/transaction';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';

export class AddSalaryEmployeeTransaction implements Transaction {
  constructor(
    private id: string,
    private name: string,
    private address: string,
    private salary: number,
  ) {}

  execute(): void {
    const employee = new Employee(this.id, this.name, this.address);

    employee.setPaymentClassification(new SalaryClassification(this.salary));
    employee.setPaymentScheduler(new MonthlyScheduler());
    employee.setPaymentMethod(new HoldMethod());

    EmployeeRepository.create(employee);
  }
}
