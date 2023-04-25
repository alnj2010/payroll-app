import { Paycheck } from './paycheck';

export interface Affiliation {
  calculateDeduction(paycheck: Paycheck): number;
}
