import { Affiliation } from '../payroll-domain/affiliation';
import { Employee } from '../payroll-domain/employee';
import { ChangeEmployeeAffiliationTransaction } from '../abstract-transaction/change-employee-affiliation-transaction';
import { ERepository } from '../payroll-repository/e-repository';
import { AffiliationRepository } from '../payroll-repository/afiliation-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class ChangeEmployeeToUnionAffiliationTransaction extends ChangeEmployeeAffiliationTransaction {
  constructor(
    id: string,
    employeeRepository: ERepository,
    private unionAffiliationRepository: AffiliationRepository,
    private payrollFactoryImplementation: PayrollFactory,
    private memberId: string,
    private memberDuesRate: number,
  ) {
    super(id, employeeRepository);
  }

  protected getAffiliation(): Affiliation {
    return this.payrollFactoryImplementation.makeUnionAffiliation(
      this.memberId,
      this.memberDuesRate,
    );
  }
  protected registerAffiliation(employee: Employee) {
    this.unionAffiliationRepository.create(this.memberId, employee);
  }
}
