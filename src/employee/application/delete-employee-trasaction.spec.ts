import { Test, TestingModule } from '@nestjs/testing';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { DeleteEmployeeTransaction } from './delete-employee-transaction';
import { Employee } from '../domain/employee';

describe('deleteEmployeeTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
  });

  describe('deleteSalaryEmployeeTransaction execute method', () => {
    it('When execute method is called a employee is deleted', () => {
      const addEmployeeTransaction = new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      );
      addEmployeeTransaction.execute();
      expect(EmployeeRepository.read(employeeId)).toBeInstanceOf(Employee);

      const deleteEmployeeTransaction = new DeleteEmployeeTransaction(
        employeeId,
      );

      deleteEmployeeTransaction.execute();

      expect.assertions(2);
      try {
        EmployeeRepository.read(employeeId);
      } catch (error) {
        expect(error.message).toBe('Employee not found');
      }
    });
  });
});
