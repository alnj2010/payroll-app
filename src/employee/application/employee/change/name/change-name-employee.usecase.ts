import { Employee } from '../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../change-employee.usecase';

export class ChangeNameEmployeeUsecase extends ChangeEmployeeUsecase {
  constructor(employeeId: string, private newName: string) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    employee.setName(this.newName);
  }
}
