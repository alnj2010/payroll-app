import { Affiliation } from '../payroll-domain/affiliation';
import { Paycheck } from '../payroll-domain/paycheck';

export class NoAffiliation implements Affiliation {
  calculateDeduction(paycheck: Paycheck): number {
    return 0;
  }
}
