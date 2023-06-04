import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeMailAddress,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { ChangeEmployeeToMailMethodTransaction } from './change-employee-to-mail-method-transaction';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { MailMethod } from '../payroll-implementations/mail-method';
import { HoldMethod } from '../payroll-implementations/hold-method';
import { ChangeEmployeeToHoldMethodTransaction } from './change-employee-to-hold-method-transaction';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeToHoldMethodTransaction class', () => {
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

  describe('ChangeEmployeeToHoldMethodTransaction execute method', () => {
    it('When execute method is called then the employee method is updated to hold', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new ChangeEmployeeToMailMethodTransaction(
        employeeId,
        employeeRepository,
        payrollFactory,
        employeeMailAddress,
      ).execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getPaymentMethod()).toBeInstanceOf(MailMethod);

      const transaction = new ChangeEmployeeToHoldMethodTransaction(
        employeeId,
        employeeRepository,
        payrollFactory,
      );
      transaction.execute();

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentMethod()).toBeInstanceOf(HoldMethod);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToHoldMethodTransaction(
      employeeId,
      employeeRepository,
      payrollFactory,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
