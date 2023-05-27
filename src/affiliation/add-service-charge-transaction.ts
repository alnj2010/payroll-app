import { ServiceCharge } from './service-charge';
import { Transaction } from '../domain/transaction';
import { UnionAffiliation } from './union-affiliation';
import { AffiliationRepository } from 'src/payroll-database/afiliation-repository';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private serviceChargeDate: string,
    private memberId: string,
    private amount: number,

    private unionAffiliationRepository: AffiliationRepository,
  ) {}

  public execute(): void {
    try {
      const employee = this.unionAffiliationRepository.read(this.memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      affiliation.addServiceCharge(
        new ServiceCharge(this.serviceChargeDate, this.amount),
      );
    } catch (error) {
      throw error;
    }
  }
}
