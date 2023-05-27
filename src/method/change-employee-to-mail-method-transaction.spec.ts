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

describe('ChangeEmployeeToMailMethodTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
  });

  describe('ChangeEmployeeToMailMethodTransaction execute method', () => {
    it('When execute method is called then the employee method is updated to mail', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToMailMethodTransaction(
        employeeId,
        employeeRepository,
        employeeMailAddress,
      );
      transaction.execute();

      const employee = employeeRepository.read(employeeId);
      const paymentMethod = employee.getPaymentMethod() as MailMethod;

      expect(employee.getId()).toEqual(employeeId);
      expect(employee.getPaymentMethod()).toBeInstanceOf(MailMethod);
      expect(paymentMethod.getMail()).toEqual(employeeMailAddress);
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToMailMethodTransaction(
      employeeId,
      employeeRepository,
      employeeMailAddress,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
