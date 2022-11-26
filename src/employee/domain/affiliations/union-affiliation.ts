import { ServiceCharge } from '../service-charge';
import { Affiliation } from './affiliation';

export class UnionAffiliation implements Affiliation {
  private serviceCharges: ServiceCharge[] = [];

  constructor(private dueRate: number) {}

  getFee(): number {
    return 0;
  }

  getDueRate(): number {
    return this.dueRate;
  }

  getServiceCharges(): ServiceCharge[] {
    return this.serviceCharges;
  }

  addServiceCharges(serviceCharge: ServiceCharge) {
    this.serviceCharges.push(serviceCharge);
  }
}
