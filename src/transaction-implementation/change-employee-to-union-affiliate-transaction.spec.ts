import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeehourlyRate,
  memberId,
  memberDuesRate,
} from '../../test/dummies';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { AddHourlyEmployeeTransaction } from './add-hourly-employee-transaction';
import { UnionAffiliationsRepository } from '../payroll-repository-implementation/union-affiliation-repository';
import { UnionAffiliation } from '../payroll-implementations/union-affiliation';
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeToUnionAffiliationTransaction class', () => {
  const employeeRepository = new EmployeeRepository();
  const unionAffiliationRepository = new UnionAffiliationsRepository();
  const payrollFactory = new PayrollFactoryImplementation();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    employeeRepository.clear();
    unionAffiliationRepository.clear();
  });

  describe('ChangeEmployeeToUnionAffiliationTransaction execute method', () => {
    it('When execute method is called then the employee affiliation is updated to Union', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      const transaction = new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      );
      transaction.execute();

      const employee = unionAffiliationRepository.read(memberId);
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
      employeeRepository,
      unionAffiliationRepository,
      payrollFactory,
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
