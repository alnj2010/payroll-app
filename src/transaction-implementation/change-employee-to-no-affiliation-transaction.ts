import { Affiliation } from '../payroll-domain/affiliation';
import { Employee } from '../payroll-domain/employee';
import { UnionAffiliation } from '../payroll-implementations/union-affiliation';
import { ChangeEmployeeAffiliationTransaction } from '../abstract-transaction/change-employee-affiliation-transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { AffiliationRepository } from '../payroll-repository/afiliation-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class ChangeEmployeeToNoAffiliationTransaction extends ChangeEmployeeAffiliationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private unionAffiliationRepository: AffiliationRepository,
    private payrollFactoryImplementation: PayrollFactory,
  ) {
    super(id, employeeRepository);
  }

  protected getAffiliation(): Affiliation {
    return this.payrollFactoryImplementation.makeNoAffiliation();
  }
  protected registerAffiliation(employee: Employee) {
    const affiliation = employee.getAffiliation() as UnionAffiliation;
    const memberId = affiliation.getMemberId();

    this.unionAffiliationRepository.delete(memberId);
  }
}
