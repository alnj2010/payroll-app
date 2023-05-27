import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeSalary,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { ChangeEmployeeToSalaryClassificationTransaction } from './change-employee-to-salary-classification-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { SalaryClassification } from './salary-classification';
import { MonthlyScheduler } from '../schedule/monthly-scheduler';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';

describe('ChangeEmployeeToSalaryClassificationTransaction class', () => {
  const employeeRepository = EmployeeRepository.getInstance();
  const unionAffiliationRepository = UnionAffiliationsRepository.getInstance();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
    unionAffiliationRepository.clear();
  });

  describe('ChangeEmployeeToSalaryClassificationTransaction execute method', () => {
    it('When execute method is called then the employee payment is updated to salary', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToSalaryClassificationTransaction(
        employeeId,
        employeeSalary,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentClassification()).toBeInstanceOf(
        SalaryClassification,
      );
      expect(employee.getPaymentScheduler()).toBeInstanceOf(MonthlyScheduler);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToSalaryClassificationTransaction(
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
