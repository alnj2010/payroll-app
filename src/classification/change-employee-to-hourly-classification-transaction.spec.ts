import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeehourlyRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { ChangeEmployeeToHourlyClassificationTransaction } from './change-employee-to-hourly-classification-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { HourlyClassification } from './hourly-classification';
import { WeeklyScheduler } from '../schedule/weekly-scheduler';

describe('ChangeEmployeeToHourlyClassificationTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
  });

  describe('ChangeEmployeeToHourlyClassificationTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to hourly', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeeSalary,
      ).execute();

      const transaction = new ChangeEmployeeToHourlyClassificationTransaction(
        employeeId,
        employeeRepository,
        employeehourlyRate,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        HourlyClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(WeeklyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToHourlyClassificationTransaction(
      employeeId,
      employeeRepository,
      employeeSalary,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
