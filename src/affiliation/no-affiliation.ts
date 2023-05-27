import { Affiliation } from '../domain/affiliation';
import { Paycheck } from '../domain/paycheck';

export class NoAffiliation implements Affiliation {
  calculateDeduction(paycheck: Paycheck): number {
    return 0;
  }
}
