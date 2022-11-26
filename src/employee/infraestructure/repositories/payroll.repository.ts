import { Employee } from '../../domain/employee';

export class PayrollRepository {
  private static employees = new Map();
  private static unionMembers = new Map<string, Employee>();

  static async getEmployee(id: string): Promise<Employee> {
    return this.employees.get(id) || null;
  }

  static async addEmployee(employee: Employee): Promise<void> {
    await this.employees.set(employee.getId(), employee);
  }

  static async addEmployeeToUnionAffiliation(
    memberId,
    employee: Employee,
  ): Promise<void> {
    await this.unionMembers.set(memberId, employee);
  }

  static async getEmployeeByUnionAffiliation(id: string): Promise<Employee> {
    return this.unionMembers.get(id) || null;
  }

  static async deleteEmployee(id: string): Promise<boolean> {
    return this.employees.delete(id);
  }

  static async deleteAffiliation(id: string): Promise<boolean> {
    return this.employees.delete(id);
  }
  static async clear() {
    this.employees.clear();
    this.unionMembers.clear();
  }
}
