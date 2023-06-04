import { Transaction } from '../transaction/transaction';
import { UnionAffiliation } from '../payroll-implementations/union-affiliation';
import { AffiliationRepository } from '../payroll-repository/afiliation-repository';
import { PayrollFactory } from '../payroll-factory/payroll-factory';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private serviceChargeDate: string,
    private memberId: string,
    private amount: number,

    private unionAffiliationRepository: AffiliationRepository,
    private payrollFactoryImplementation: PayrollFactory,
  ) {}

  public execute(): void {
    try {
      const employee = this.unionAffiliationRepository.read(this.memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      affiliation.addServiceCharge(
        this.payrollFactoryImplementation.makeServiceCharge(
          this.serviceChargeDate,
          this.amount,
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
