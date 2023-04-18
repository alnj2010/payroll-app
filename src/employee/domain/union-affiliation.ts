import { Affiliation } from './affiliation';
import { ServiceCharge } from './service-charge';

export class UnionAffiliation extends Affiliation {
  private serviceCharges = new Map<string, ServiceCharge>();

  constructor(private memberId: string, private dueRate: number) {
    super();
  }

  public getMemberId(): string {
    return this.memberId;
  }

  public getDueRate(): number {
    return this.dueRate;
  }

  public addServiceCharge(serviceCharge: ServiceCharge): void {
    this.serviceCharges.set(serviceCharge.getId(), serviceCharge);
  }

  public getServiceCharge(id: string): ServiceCharge {
    return this.serviceCharges.get(id);
  }
}
