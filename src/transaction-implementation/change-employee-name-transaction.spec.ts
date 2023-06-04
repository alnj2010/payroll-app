import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeName2,
  employeehourlyRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { ChangeEmployeeNameTransaction } from './change-employee-name-transaction';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeNameTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  const payrollFactory = new PayrollFactoryImplementation();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
  });

  describe('ChangeEmployeeNameTransaction execute method', () => {
    it('When execute method is called then the employee name is updated', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeNameTransaction(
        employeeId,
        employeeRepository,
        employeeName2,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getName()).toEqual(employeeName2);
      expect(employee.getId()).toEqual(employeeId);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeNameTransaction(
      employeeId,
      employeeRepository,
      employeeName2,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
