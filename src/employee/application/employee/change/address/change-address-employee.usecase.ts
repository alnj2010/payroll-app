import { Employee } from '../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../change-employee.usecase';

export class ChangeAddressEmployeeUsecase extends ChangeEmployeeUsecase {
  constructor(employeeId: string, private newAddress: string) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    employee.setAddress(this.newAddress);
  }
}
