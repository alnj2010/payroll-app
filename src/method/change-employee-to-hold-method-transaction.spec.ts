import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  employeeMailAddress,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-database-implementation/employee-repository';
import { ChangeEmployeeToMailMethodTransaction } from './change-employee-to-mail-method-transaction';
import { AddHourlyEmployeeTransaction } from '../classification/add-hourly-employee-transaction';
import { MailMethod } from './mail-method';
import { HoldMethod } from './hold-method';
import { ChangeEmployeeToHoldMethodTransaction } from './change-employee-to-hold-method-transaction';

describe('ChangeEmployeeToHoldMethodTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
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
        employeehourlyRate,
      ).execute();

      new ChangeEmployeeToMailMethodTransaction(
        employeeId,
        employeeRepository,
        employeeMailAddress,
      ).execute();

      const employee = employeeRepository.read(employeeId);

      expect(employee.getPaymentMethod()).toBeInstanceOf(MailMethod);

      const transaction = new ChangeEmployeeToHoldMethodTransaction(
        employeeId,
        employeeRepository,
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
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
