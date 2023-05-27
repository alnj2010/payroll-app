import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeBank,
  employeeBankAccount,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { ChangeEmployeeToDirectMethodTransaction } from './change-employee-to-direct-method-transaction';
import { AddHourlyEmployeeTransaction } from '../classification/add-hourly-employee-transaction';
import { DirectMethod } from './direct-method';
import { UnionAffiliationsRepository } from '../payroll-database-implementation/union-affiliation-repository';

describe('ChangeEmployeeToDirectMethodTransaction class', () => {
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

  describe('ChangeEmployeeToDirectMethodTransaction execute method', () => {
    it('When execute method is called then the employee method is updated to direct', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToDirectMethodTransaction(
        employeeId,
        employeeBank,
        employeeBankAccount,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);
      const paymentMethod = employee.getPaymentMethod() as DirectMethod;

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentMethod()).toBeInstanceOf(DirectMethod);
      expect(paymentMethod.getAccount()).toEqual(employeeBankAccount);
      expect(paymentMethod.getBank()).toEqual(employeeBank);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToDirectMethodTransaction(
      employeeId,
      employeeBank,
      employeeBankAccount,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
