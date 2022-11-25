import { Employee } from '../../domain/employee';

export class PayrollRepository {
  private static employees = new Map();

  static async getEmployee(id: string): Promise<Employee> {
    return this.employees.get(id) || null;
  }

  static async addEmployee(employee: Employee): Promise<void> {
    await this.employees.set(employee.getId(), employee);
  }

  static async deleteEmployee(id: string): Promise<boolean> {
    return this.employees.delete(id);
  }
}
