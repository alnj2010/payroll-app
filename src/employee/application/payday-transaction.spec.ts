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
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { AddTimeCardTransaction } from './add-time-card-transaction';
import { PaydayTransaction } from './payday-transaction';
import { Paycheck } from '../domain/paycheck';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { AddServiceChargeTransaction } from './add-service-charge-transaction';

describe('paydayTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
    UnionAffiliationsRepository.clear();
  });

  describe('paydayTransaction execute method', () => {
    it('When execute method is called on friday but there is not a employee to paid then return 0 paychecks', () => {
      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();
      expect(paychecks.size).toBe(0);
    });

    it('When execute method is called on a day other than Friday then return 0 paychecks', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
      ).execute();

      const transaction = new PaydayTransaction(dateOtherThanFridayDummy);
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
        employeehourlyRate,
      ).execute();

      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).not.toBeUndefined();
      expect(paycheck.getPayPeriodEndDate()).toBe(dateFridayDummy);
      expect(paycheck.getGrossPay()).toBe(0);
      expect(paycheck.getDisposition()).toBe('Hold');
      expect(paycheck.getDeduction()).toBe(0);
      expect(paycheck.getNetPay()).toBe(0);
    });

    it('When execute method is called on friday but employee timecard is out date then return a null paychecks', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardOutDate,
        timecardHours,
      ).execute();

      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).not.toBeUndefined();
      expect(paycheck.getPayPeriodEndDate()).toBe(dateFridayDummy);
      expect(paycheck.getGrossPay()).toBe(0);
      expect(paycheck.getDisposition()).toBe('Hold');
      expect(paycheck.getDeduction()).toBe(0);
      expect(paycheck.getNetPay()).toBe(0);
    });

    it('When execute method is called on friday then an hourly employees, without affiliation, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
      ).execute();

      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).not.toBeUndefined();
      expect(paycheck.getPayPeriodEndDate()).toBe(dateFridayDummy);
      expect(paycheck.getGrossPay()).toBe(employeehourlyRate * timecardHours);
      expect(paycheck.getDisposition()).toBe('Hold');
      expect(paycheck.getDeduction()).toBe(0);
      expect(paycheck.getNetPay()).toBe(employeehourlyRate * timecardHours);
    });

    it('When execute method is called on friday then an hourly employees, with affiliation, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).not.toBeUndefined();
      expect(paycheck.getPayPeriodEndDate()).toBe(dateFridayDummy);
      expect(paycheck.getGrossPay()).toBe(employeehourlyRate * timecardHours);
      expect(paycheck.getDisposition()).toBe('Hold');
      expect(paycheck.getDeduction()).toBe(memberDuesRate);
      expect(paycheck.getNetPay()).toBe(
        employeehourlyRate * timecardHours - memberDuesRate,
      );
    });

    it('When execute method is called on friday then an hourly employees, with affiliation and service charges, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        memberId,
        memberDuesRate,
      ).execute();

      new AddServiceChargeTransaction(
        serviceChargeDate,
        memberId,
        serviceChargeAmount,
      ).execute();

      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).not.toBeUndefined();
      expect(paycheck.getPayPeriodEndDate()).toBe(dateFridayDummy);
      expect(paycheck.getGrossPay()).toBe(employeehourlyRate * timecardHours);
      expect(paycheck.getDisposition()).toBe('Hold');
      expect(paycheck.getDeduction()).toBe(
        memberDuesRate + serviceChargeAmount,
      );
      expect(paycheck.getNetPay()).toBe(
        employeehourlyRate * timecardHours -
          (memberDuesRate + serviceChargeAmount),
      );
    });

    it('When execute method is called on friday then an hourly employees, with affiliation and out date service charges, is paid', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        memberId,
        memberDuesRate,
      ).execute();

      new AddServiceChargeTransaction(
        serviceChargeOutDate,
        memberId,
        serviceChargeAmount,
      ).execute();

      const transaction = new PaydayTransaction(dateFridayDummy);
      transaction.execute();

      const paychecks: Map<string, Paycheck> = transaction.getPaychecks();

      const paycheck = paychecks.get(employeeId);

      expect(paycheck).not.toBeUndefined();
      expect(paycheck.getPayPeriodEndDate()).toBe(dateFridayDummy);
      expect(paycheck.getGrossPay()).toBe(employeehourlyRate * timecardHours);
      expect(paycheck.getDeduction()).toBe(memberDuesRate);
      expect(paycheck.getDisposition()).toBe('Hold');
      expect(paycheck.getNetPay()).toBe(
        employeehourlyRate * timecardHours - memberDuesRate,
      );
    });
  });
});
