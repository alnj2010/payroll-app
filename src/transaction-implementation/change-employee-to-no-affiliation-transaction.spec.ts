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
import { ChangeEmployeeToUnionAffiliationTransaction } from './change-employee-to-union-affiliate-transaction';
import { ChangeEmployeeToNoAffiliationTransaction } from './change-employee-to-no-affiliation-transaction';
import { NoAffiliation } from '../payroll-implementations/no-affiliation';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

describe('ChangeEmployeeToNoAffiliationTransaction class', () => {
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

  describe('ChangeEmployeeToNoAffiliationTransaction execute method', () => {
    it('When execute method is called then the employee affiliation is updated to no affiliation', () => {
      new AddHourlyEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeRepository,
        payrollFactory,
        employeehourlyRate,
      ).execute();

      new ChangeEmployeeToUnionAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
        memberId,
        memberDuesRate,
      ).execute();

      const transaction = new ChangeEmployeeToNoAffiliationTransaction(
        employeeId,
        employeeRepository,
        unionAffiliationRepository,
        payrollFactory,
      );
      transaction.execute();

      try {
        unionAffiliationRepository.read(memberId);
      } catch (error) {
        const employee = employeeRepository.read(employeeId);
        const affiliation = employee.getAffiliation();
        expect(employee.getId()).toEqual(employeeId);
        expect(affiliation).toBeInstanceOf(NoAffiliation);
      }
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
