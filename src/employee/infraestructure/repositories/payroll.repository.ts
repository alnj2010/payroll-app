import { Employee } from '../../domain/employee';

export class PayrollRepository {
  private static employees = new Map();

  static getEmployee(id: string): Employee {
    return this.employees.get(id) || null;
  }

  static addEmployee(employee: Employee) {
    this.employees.set(employee.getId(), employee);
  }

  static deleteEmployee(id: string) {
    this.employees.delete(id);
  }
}
