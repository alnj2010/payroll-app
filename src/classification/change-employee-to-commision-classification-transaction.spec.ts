import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  employeeCommissionRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { ChangeEmployeeToCommissionClassificationTransaction } from './change-employee-to-commission-classification-transaction';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { CommissionClassification } from './commission-classification';
import { BiweeklyScheduler } from '../schedule/biweekly-scheduler';

describe('ChangeEmployeeToCommissionClassificationTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
  });

  describe('ChangeEmployeeToCommissionClassificationTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to commission', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeeSalary,
      ).execute();

      const transaction =
        new ChangeEmployeeToCommissionClassificationTransaction(
          employeeId,
          employeeRepository,
          employeeSalary,
          employeeCommissionRate,
        );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        CommissionClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(BiweeklyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToCommissionClassificationTransaction(
      employeeId,
      employeeRepository,
      employeeSalary,
      employeeCommissionRate,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
