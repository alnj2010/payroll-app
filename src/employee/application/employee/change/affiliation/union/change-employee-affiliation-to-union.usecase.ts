import { Employee } from '../../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../../change-employee.usecase';
import { UnionAffiliation } from '../../../../../domain/affiliations/union-affiliation';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';

export class ChangeEmployeeAffiliationToUnionUsecase extends ChangeEmployeeUsecase {
  constructor(
    employeeId: string,
    private memberId: string,
    private dueRate: number,
  ) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    await PayrollRepository.addEmployeeToUnionAffiliation(
      this.memberId,
      employee,
    );
    employee.setAffiliation(new UnionAffiliation(this.memberId, this.dueRate));
  }
}
