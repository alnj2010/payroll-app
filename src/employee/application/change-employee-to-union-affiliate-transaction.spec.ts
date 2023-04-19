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
import { UnionAffiliation } from '../domain/union-affiliation';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';

describe('ChangeEmployeeToUnionAffiliationTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
    UnionAffiliationsRepository.clear();
  });

  describe('ChangeEmployeeToUnionAffiliationTransaction execute method', () => {
    it('When execute method is called then the employee affiliation is updated to Union', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        memberId,
        memberDuesRate,
      );
      transaction.execute();

      const employee = UnionAffiliationsRepository.read(memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      expect(employee.getId()).toEqual(employeeId);
      expect(affiliation).toBeInstanceOf(UnionAffiliation);
      expect(affiliation.getDueRate()).toBe(memberDuesRate);
      expect(affiliation.getMemberId()).toBe(memberId);
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
