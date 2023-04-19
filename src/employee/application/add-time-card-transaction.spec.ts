import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeehourlyRate,
  timecardDate,
  timecardHours,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { HourlyClassification } from '../domain/hourly-classification';
import { AddTimeCardTransaction } from './add-time-card-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';

describe('addTimeCardTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
    UnionAffiliationsRepository.clear();
  });

  describe('addTimeCardTransaction execute method', () => {
    it('When execute method is called then a time card is added to Hourly Employee', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const employee = EmployeeRepository.read(employeeId);
      const classification =
        employee.getPaymentClassification() as HourlyClassification;

      const addTimeCardTransaction = new AddTimeCardTransaction(
        employee.getId(),
        timecardDate,
        timecardHours,
      );

      addTimeCardTransaction.execute();

      const timecard = classification.getTimeCard(timecardDate);

      expect(timecard.getDate()).toEqual(timecardDate);
      expect(timecard.getHours()).toEqual(timecardHours);
    });

    it('When execute method is called but employee is not founded then occurs a exeception', () => {
      const addTimeCardTransaction = new AddTimeCardTransaction(
        employeeId,
        timecardDate,
        timecardHours,
      );

      expect.assertions(1);
      try {
        addTimeCardTransaction.execute();
      } catch (error) {
        expect(error.message).toBe('Employee not found');
      }
    });

    it('When execute method is called but employee classification is different to Hourly then occurs a exeception', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      ).execute();

      const employee = EmployeeRepository.read(employeeId);

      const addTimeCardTransaction = new AddTimeCardTransaction(
        employee.getId(),
        timecardDate,
        timecardHours,
      );

      expect.assertions(1);
      try {
        addTimeCardTransaction.execute();
      } catch (error) {
        expect(error.message).toBe(
          'The Employee is not hourly payment classification',
        );
      }
    });
  });
});
