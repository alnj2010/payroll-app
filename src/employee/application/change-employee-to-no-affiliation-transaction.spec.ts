import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  memberId,
  memberDuesRate,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { ChangeEmployeeToNoAffiliationTransaction } from './change-employee-to-no-affiliation-transaction';
import { NoAffiliation } from '../domain/no-affiliation';

describe('ChangeEmployeeToNoAffiliationTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
    UnionAffiliationsRepository.clear();
  });

  describe('ChangeEmployeeToNoAffiliationTransaction execute method', () => {
    it('When execute method is called then the employee affiliation is updated to no affiliation', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new ChangeEmployeeToNoAffiliationTransaction(
        employeeId,
      );
      transaction.execute();

      try {
        UnionAffiliationsRepository.read(memberId);
      } catch (error) {
        const employee = EmployeeRepository.read(employeeId);
        const affiliation = employee.getAffiliation();
        expect(employee.getId()).toEqual(employeeId);
        expect(affiliation).toBeInstanceOf(NoAffiliation);
      }
    });
  });

  it('When execute method is called but employee is not founded then occurs a exeception', () => {
    const transaction = new ChangeEmployeeToUnionAffiliationTransaction(
      employeeId,
      memberId,
      memberDuesRate,
    );

    expect.assertions(1);
    try {
      transaction.execute();
    } catch (error) {
      expect(error.message).toBe('Employee not found');
    }
  });
});
