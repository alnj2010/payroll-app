import { Affiliation } from './affiliation';
import { Paycheck } from './paycheck';

export class NoAffiliation implements Affiliation {
  calculateDeduction(paycheck: Paycheck): number {
    return 0;
  }
}
