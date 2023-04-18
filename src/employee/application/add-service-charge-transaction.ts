import { ServiceCharge } from '../domain/service-charge';
import { Transaction } from '../domain/transaction';
import { UnionAffiliation } from '../domain/union-affiliation';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private serviceChargeId: string,
    private memberId: string,
    private amount: number,
  ) {}

  public execute(): void {
    try {
      const employee = UnionAffiliationsRepository.read(this.memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      affiliation.addServiceCharge(
        new ServiceCharge(this.serviceChargeId, this.amount),
      );
    } catch (error) {
      throw error;
    }
  }
}
