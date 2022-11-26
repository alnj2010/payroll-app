import { Employee } from '../../../../../domain/employee';
import { ChangeEmployeeUsecase } from '../../change-employee.usecase';
import { UnionAffiliation } from '../../../../../domain/affiliations/union-affiliation';
import { PayrollRepository } from '../../../../../infraestructure/repositories/payroll.repository';
import { NoAffiliation } from '../../../../../domain/affiliations/no-affiliation';

export class ChangeEmployeeAffiliationToNoaffiliateUsecase extends ChangeEmployeeUsecase {
  constructor(employeeId: string) {
    super(employeeId);
  }

  async changeProperty(employee: Employee) {
    await PayrollRepository.deleteAffiliation(
      (employee.getAffiliation() as UnionAffiliation).getMemberId(),
    );
    employee.setAffiliation(new NoAffiliation());
  }
}
