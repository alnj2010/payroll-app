import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeehourlyRate,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { ChangeEmployeeToHourlyPaymentTransaction } from './change-employee-to-hourly-payment-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { HourlyClassification } from '../domain/hourly-classification';
import { WeeklyScheduler } from '../domain/weekly-scheduler';

describe('ChangeEmployeeToHourlyPaymentTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('ChangeEmployeeToHourlyPaymentTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to hourly', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      ).execute();

      const transaction = new ChangeEmployeeToHourlyPaymentTransaction(
        employeeId,
        employeehourlyRate,
      );
      transaction.execute();

      const employee = EmployeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        HourlyClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(WeeklyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToHourlyPaymentTransaction(
      employeeId,
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