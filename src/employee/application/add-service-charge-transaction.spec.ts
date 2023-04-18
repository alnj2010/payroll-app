import { Test, TestingModule } from '@nestjs/testing';
import {
  employeeAddress,
  employeeId,
  employeeName,
  employeeSalary,
  memberDuesRate,
  memberId,
  serviceChargeAmount,
  serviceChargeId,
} from '../../../test/dummies';
import { EmployeeRepository } from '../infraestructure/repositories/employees/employee-repository';
import { AddServiceChargeTransaction } from './add-service-charge-transaction';
import { UnionAffiliationsRepository } from '../infraestructure/repositories/union/union-affiliation-repository';
import { AddSalaryEmployeeTransaction } from './add-salary-employee-transaction';
import { UnionAffiliation } from '../domain/union-affiliation';
import { AddEmployeeUnionAffiliationTransaction } from './add-employee-union-affiliation-transaction';

describe('addServiceChargeTransaction class', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
  });

  afterEach(async () => {
    EmployeeRepository.clear();
    UnionAffiliationsRepository.clear();
  });

  describe('addServiceChargeTransaction execute method', () => {
    it('When execute method is called then a service charge is added to union member', () => {
      new AddSalaryEmployeeTransaction(
        employeeId,
        employeeName,
        employeeAddress,
        employeeSalary,
      ).execute();

      new AddEmployeeUnionAffiliationTransaction(
        memberId,
        memberDuesRate,
        employeeId,
      ).execute();

      const addServiceChargeTransaction = new AddServiceChargeTransaction(
        serviceChargeId,
        memberId,
        serviceChargeAmount,
      );

      addServiceChargeTransaction.execute();

      const employee = UnionAffiliationsRepository.read(memberId);
      const affiliation = employee.getAffiliation() as UnionAffiliation;
      const serviceCharge = affiliation.getServiceCharge(serviceChargeId);

      expect(serviceCharge.getAmount()).toBe(serviceChargeAmount);
      expect(serviceCharge.getId()).toBe(serviceChargeId);
    });

    it('When execute method is called but affiliation is not founded then occurs a exeception', () => {
      const addServiceChargeTransaction = new AddServiceChargeTransaction(
        serviceChargeId,
        memberId,
        serviceChargeAmount,
      );

      expect.assertions(1);
      try {
        addServiceChargeTransaction.execute();
      } catch (error) {
        expect(error.message).toBe('UnionAffiliation not found');
      }
    });
  });
});
