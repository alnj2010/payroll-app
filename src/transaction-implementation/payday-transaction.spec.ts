import { Test, TestingModule } from '@nestjs/testing';
import {
  dateFridayDummy,
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  timecardDate,
  timecardHours,
  dateOtherThanFridayDummy,
  timecardOutDate,
  memberId,
  memberDuesRate,
  serviceChargeDate,
  serviceChargeAmount,
  serviceChargeOutDate,
  employeeBank,
  employeeBankAccount,
  dateLastDayOfMonthDummy,
  employeeSalary,
  dateOtherThanLastDayOfMonthDummy,
  employeeMailAddress,
  dateMiddleDayOfMonth,
  employeeCommissionRate,
  dateOtherThanMiddleDayOfMonth,
  saleReceiptAmount,
  dateFirstDayOfMonthDummy,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { UnionAffiliationsRepository } from '../payroll-repository-implementation/union-affiliation-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { AddTimeCardTransaction } from './add-time-card-transaction';
import { PaydayTransaction } from './payday-transaction';
import { Paycheck } from '../payroll-domain/paycheck';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { AddServiceChargeTransaction } from './add-service-charge-transaction';
import { Method } from '../payroll-domain/payment-method';
import { ChangeEmployeeToDirectMethodTransaction } from './change-employee-to-direct-method-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { ChangeEmployeeToMailMethodTransaction } from './change-employee-to-mail-method-transaction';
import { AddCommissionEmployeeTransaction } from './add-commission-employee-transaction';
import { AddSaleReceiptTransaction } from './add-sale-receipt-transaction';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

function assertPaycheck(
  paycheck: Paycheck,
  periodEndDate: string,
  grossPay: number,
  disposition: string,
  deduction: number,
  netPay: number,
) {
  expect(paycheck).not.toBeUndefined();
  expect(paycheck.getPayPeriodEndDate()).toBe(periodEndDate);
  expect(paycheck.getGrossPay()).toBe(grossPay);
  expect(paycheck.getDisposition()).toBe(disposition);
  expect(paycheck.getDeduction()).toBe(deduction);
  expect(paycheck.getNetPay()).toBe(netPay);
}

describe('paydayTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  const unionAffiliationRepository = new UnionAffiliationsRepository();
  const payrollFactory = new PayrollFactoryImplementation();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
    unionAffiliationRepository.clear();
  });

  describe('paydayTransaction execute method - hourly employees', () => {
    it('When execute method is called on friday but there is not a employee to paid then return 0 paychecks', () => {
      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();
      expect(paychecks.size).toBe(0);
    });

    it('When execute method is called on a day other than Friday then return 0 paychecks', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateOtherThanFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).toBeUndefined();
    });

    it('When execute method is called on friday but employee has no time card then return a null paychecks', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(paycheck, dateFridayDummy, 0, Method.HOLD, 0, 0);
    });

    it('When execute method is called on friday but employee timecard is out date then return a null paychecks', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardOutDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(paycheck, dateFridayDummy, 0, Method.HOLD, 0, 0);
    });

    it('When execute method is called on friday then an hourly employees, without affiliation, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateFridayDummy,
        employeehourlyRate * timecardHours,
        Method.HOLD,
        0,
        employeehourlyRate * timecardHours,
      );
    });

    it('When execute method is called on friday then an hourly employees, with affiliation, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateFridayDummy,
        employeehourlyRate * timecardHours,
        Method.HOLD,
        memberDuesRate,
        employeehourlyRate * timecardHours - memberDuesRate,
      );
    });

    it('When execute method is called on friday then an hourly employees, with affiliation and service charges, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      new AddServiceChargeTransaction(
        serviceChargeDate,
        memberId,
        serviceChargeAmount,
        unionAffiliationRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateFridayDummy,
        employeehourlyRate * timecardHours,
        Method.HOLD,
        memberDuesRate + serviceChargeAmount,
        employeehourlyRate * timecardHours -
          (memberDuesRate + serviceChargeAmount),
      );
    });

    it('When execute method is called on friday then an hourly employees, with affiliation and out date service charges, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      new AddServiceChargeTransaction(
        serviceChargeOutDate,
        memberId,
        serviceChargeAmount,
        unionAffiliationRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateFridayDummy,
        employeehourlyRate * timecardHours,
        Method.HOLD,
        memberDuesRate,
        employeehourlyRate * timecardHours - memberDuesRate,
      );
    });
    it('When execute method is called on friday then an hourly employees, with direct method, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToDirectMethodTransaction(
        employeeId,
        employeeRepository,
        payrollFactory,
        employeeBank,
        employeeBankAccount,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateFridayDummy,
        employeehourlyRate * timecardHours,
        Method.DIRECT,
        0,
        employeehourlyRate * timecardHours,
      );
    });

    it('When execute method is called on friday then an hourly employees, with mail method, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToMailMethodTransaction(
        employeeId,
        employeeRepository,
        payrollFactory,
        employeeMailAddress,
      ).execute();

      const transaction = new PaydayTransaction(
        dateFridayDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateFridayDummy,
        employeehourlyRate * timecardHours,
        Method.MAIL,
        0,
        employeehourlyRate * timecardHours,
      );
    });
  });

  describe('paydayTransaction execute method - salary employees', () => {
    it('When execute method is called in last day of month but there is not a employee to paid then return 0 paychecks', () => {
      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();
      expect(paychecks.size).toBe(0);
    });

    it('When execute method is called on a day other than last day of month then return 0 paychecks', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
      ).execute();

      const transaction = new PaydayTransaction(
        dateOtherThanLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).toBeUndefined();
    });

    it('When execute method is called in last day of month then an employee, without affiliation, is paid', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
      ).execute();

      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateLastDayOfMonthDummy,
        employeeSalary,
        Method.HOLD,
        0,
        employeeSalary,
      );
    });

    it('When execute method is called in last day of month then an employee, with affiliation, is paid', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateLastDayOfMonthDummy,
        employeeSalary,
        Method.HOLD,
        memberDuesRate * 4,
        employeeSalary - memberDuesRate * 4,
      );
    });
  });

  describe('paydayTransaction execute method - commissioned employees', () => {
    it('When execute method is called in the middle of the month but there is not a employee to paid then return 0 paychecks', () => {
      const transaction = new PaydayTransaction(
        dateMiddleDayOfMonth,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();
      expect(paychecks.size).toBe(0);
    });

    it('When execute method is called in a day other than middle of the month then return 0 paychecks', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateOtherThanMiddleDayOfMonth,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).toBeUndefined();
    });

    it('When execute method is called in last day of month then an employee, without sales receipt and affiliation, is paid', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateLastDayOfMonthDummy,
        employeeSalary,
        Method.HOLD,
        0,
        employeeSalary,
      );
    });

    it('When execute method is called in last day of month then an employee; with sales receipt, in middle of month, and without affiliation, is paid', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();
      new AddSaleReceiptTransaction(
        employeeId,
        dateMiddleDayOfMonth,
        saleReceiptAmount,
        employeeRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateLastDayOfMonthDummy,
        employeeSalary,
        Method.HOLD,
        0,
        employeeSalary,
      );
    });

    it('When execute method is called in middle of the month then an employee; with sales receipt, in first day of month, and without affiliation, is paid', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      new AddSaleReceiptTransaction(
        employeeId,
        dateFirstDayOfMonthDummy,
        saleReceiptAmount,
        employeeRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateMiddleDayOfMonth,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateMiddleDayOfMonth,
        employeeSalary + employeeCommissionRate * saleReceiptAmount,
        Method.HOLD,
        0,
        employeeSalary + employeeCommissionRate * saleReceiptAmount,
      );
    });

    it('When execute method is called in last day of month then an employee, with sales receipt and without affiliation, is paid', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      new AddSaleReceiptTransaction(
        employeeId,
        dateLastDayOfMonthDummy,
        saleReceiptAmount,
        employeeRepository,
        payrollFactory,
      ).execute();

      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateLastDayOfMonthDummy,
        employeeSalary + employeeCommissionRate * saleReceiptAmount,
        Method.HOLD,
        0,
        employeeSalary + employeeCommissionRate * saleReceiptAmount,
      );
    });

    it('When execute method is called in last day of month then an employee, with sales receipt and affiliation, is paid', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      new AddSaleReceiptTransaction(
        employeeId,
        dateLastDayOfMonthDummy,
        saleReceiptAmount,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateLastDayOfMonthDummy,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateLastDayOfMonthDummy,
        employeeSalary + employeeCommissionRate * saleReceiptAmount,
        Method.HOLD,
        memberDuesRate * 2,
        employeeSalary +
          employeeCommissionRate * saleReceiptAmount -
          memberDuesRate * 2,
      );
    });

    it('When execute method is called in middle day of month then an employee, with sales receipt and affiliation, is paid', () => {
      new AddCommissionEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeeSalary,
        employeeCommissionRate,
      ).execute();

      new AddSaleReceiptTransaction(
        employeeId,
        dateMiddleDayOfMonth,
        saleReceiptAmount,
        employeeRepository,
        payrollFactory,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new PaydayTransaction(
        dateMiddleDayOfMonth,
        employeeRepository,
      );
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      assertPaycheck(
        paycheck,
        dateMiddleDayOfMonth,
        employeeSalary + employeeCommissionRate * saleReceiptAmount,
        Method.HOLD,
        memberDuesRate * 2,
        employeeSalary +
          employeeCommissionRate * saleReceiptAmount -
          memberDuesRate * 2,
      );
    });
  });
});
