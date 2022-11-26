import { Transaction } from '../../../domain/transacction';
import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';
import { EMPLOYEE_DO_NOT_EXIST } from '../../../domain/errors/custom-messages';
import { Employee } from '../../../domain/employee';

export abstract class ChangeEmployeeUsecase implements Transaction {
  constructor(private employeeId: string) {}

  async execute() {
    const employee: Employee = await PayrollRepository.getEmployee(
      this.employeeId,
    );

    if (!employee) {
      throw new Error(EMPLOYEE_DO_NOT_EXIST);
    }

    await this.changeProperty(employee);
  }

  abstract changeProperty(employee: Employee);
}
