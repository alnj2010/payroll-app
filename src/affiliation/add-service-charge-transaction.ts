import { ServiceCharge } from './service-charge';
import { Transaction } from '../domain/transaction';
import { UnionAffiliation } from './union-affiliation';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private serviceChargeDate: string,
    private memberId: string,
    private amount: number,
  ) {}

  public execute(): void {
    try {
      const unionAffiliationRepository =
        UnionAffiliationsRepository.getInstance();
      const employee = unionAffiliationRepository.read(this.memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      affiliation.addServiceCharge(
        new ServiceCharge(this.serviceChargeDate, this.amount),
      );
    } catch (error) {
      throw error;
    }
  }
}
