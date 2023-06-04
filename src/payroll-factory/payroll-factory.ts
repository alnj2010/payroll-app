import { PaymentMethod } from '../payroll-domain/payment-method';
import { PaymentClassification } from '../payroll-domain/payment-classification';
import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { Affiliation } from '../payroll-domain/affiliation';
import { SaleReceipt } from '../payroll-implementations/sale-receipt';
import { ServiceCharge } from '../payroll-implementations/service-charge';
import { TimeCard } from '../payroll-implementations/time-card';

export interface PayrollFactory {
  makeBiweeklyScheduler(): PaymentScheduler;
  makeMonthlyScheduler(): PaymentScheduler;
  makeWeeklyScheduler(): PaymentScheduler;

  makeCommissionClassification(
    salary: number,
    commissionRate: number,
  ): PaymentClassification;
  makeHourlyClassification(hourlyRate: number): PaymentClassification;
  makeSalaryClassification(salary: number): PaymentClassification;

  makeDirectMethod(bank: string, account: string): PaymentMethod;
  makeHoldMethod(): PaymentMethod;
  makeMailMethod(mail: string): PaymentMethod;

  makeNoAffiliation(): Affiliation;
  makeUnionAffiliation(memberId: string, dueRate: number): Affiliation;

  makeSaleReceipt(date: string, amount: number): SaleReceipt;
  makeServiceCharge(id: string, amount: number): ServiceCharge;
  makeTimeCard(date: string, hours: number): TimeCard;
}
