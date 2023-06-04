import { PaymentScheduler } from '../payroll-domain/payment-scheduler';
import { PayrollFactory } from '../payroll-factory/payroll-factory';
import { BiweeklyScheduler } from './biweekly-scheduler';
import { MonthlyScheduler } from './monthly-scheduler';
import { WeeklyScheduler } from './weekly-scheduler';
import { CommissionClassification } from './commission-classification';
import { PaymentClassification } from '../payroll-domain/payment-classification';
import { HourlyClassification } from './hourly-classification';
import { SalaryClassification } from './salary-classification';
import { PaymentMethod } from '../payroll-domain/payment-method';
import { DirectMethod } from './direct-method';
import { HoldMethod } from './hold-method';
import { Affiliation } from '../payroll-domain/affiliation';
import { MailMethod } from './mail-method';
import { NoAffiliation } from './no-affiliation';
import { SaleReceipt } from './sale-receipt';
import { ServiceCharge } from './service-charge';
import { TimeCard } from './time-card';
import { UnionAffiliation } from './union-affiliation';

export class PayrollFactoryImplementation implements PayrollFactory {
  makeBiweeklyScheduler(): PaymentScheduler {
    return new BiweeklyScheduler();
  }
  makeMonthlyScheduler(): PaymentScheduler {
    return new MonthlyScheduler();
  }
  makeWeeklyScheduler(): PaymentScheduler {
    return new WeeklyScheduler();
  }

  makeCommissionClassification(
    salary: number,
    commissionRate: number,
  ): PaymentClassification {
    return new CommissionClassification(salary, commissionRate);
  }
  makeHourlyClassification(hourlyRate: number): PaymentClassification {
    return new HourlyClassification(hourlyRate);
  }
  makeSalaryClassification(salary: number): PaymentClassification {
    return new SalaryClassification(salary);
  }

  makeDirectMethod(bank: string, account: string): PaymentMethod {
    return new DirectMethod(bank, account);
  }
  makeHoldMethod(): PaymentMethod {
    return new HoldMethod();
  }
  makeMailMethod(mail: string): PaymentMethod {
    return new MailMethod(mail);
  }

  makeNoAffiliation(): Affiliation {
    return new NoAffiliation();
  }
  makeUnionAffiliation(memberId: string, dueRate: number): Affiliation {
    return new UnionAffiliation(memberId, dueRate);
  }

  makeSaleReceipt(date: string, amount: number): SaleReceipt {
    return new SaleReceipt(date, amount);
  }
  makeServiceCharge(id: string, amount: number): ServiceCharge {
    return new ServiceCharge(id, amount);
  }
  makeTimeCard(date: string, hours: number): TimeCard {
    return new TimeCard(date, hours);
  }
}
