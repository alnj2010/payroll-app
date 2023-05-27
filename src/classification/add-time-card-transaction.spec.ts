import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeehourlyRate,
  timecardDate,
  timecardHours,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { HourlyClassification } from './hourly-classification';
import { AddTimeCardTransaction } from './add-time-card-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';

describe('addTimeCardTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
  });

  describe('addTimeCardTransaction execute method', () => {
    it('When execute method is called then a time card is added to Hourly Employee', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeehourlyRate,
      ).execute();

      const employee = employeeRepository.read(employeeId);
      const classification =
        employee.getPaymentClassification() as HourlyClassification;

      const addTimeCardTransaction = new AddTimeCardTransaction(
        employee.getId(),
        timecardDate,
        timecardHours,
        employeeRepository,
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
        employeeRepository,
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
        employeeRepository,
        employeeSalary,
      ).execute();

      const employee = employeeRepository.read(employeeId);

      const addTimeCardTransaction = new AddTimeCardTransaction(
        employee.getId(),
        timecardDate,
        timecardHours,
        employeeRepository,
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
