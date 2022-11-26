import { UnionAffiliation } from '../../../domain/affiliations/union-affiliation';
import { MEMBER_DO_NOT_EXIST } from '../../../domain/errors/custom-messages';
import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
  memberDueRateDummy,
  memberIdDummy,
  memberServiceChargeAmountDummy,
} from '../../../../../test/dummies';

import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';
import { AddSalaryEmployeeUsecase } from '../../employee/add/salary/add-salary-employee.usecase';
import { AddServiceChargeUsecase } from './add-service-charge.usecase';
import { Employee } from '../../../domain/employee';
import { ChangeEmployeeAffiliationToUnionUsecase } from '../../employee/change/affiliation/union/change-employee-affiliation-to-union.usecase';

describe('addTimeCard usecase ', () => {
  afterEach(async () => {
    await PayrollRepository.clear();
  });

  it('WHEN execute method is called THEN a service charge should be added', async () => {
    await new AddSalaryEmployeeUsecase(
      employeeIdDummy,
      employeeNameDummy,
      employeeAddressDummy,
      employeeSalaryDummy,
    ).execute();

    await new ChangeEmployeeAffiliationToUnionUsecase(
      employeeIdDummy,
      memberIdDummy,
      memberDueRateDummy,
    ).execute();

    await new AddServiceChargeUsecase(
      memberIdDummy,
      memberServiceChargeAmountDummy,
    ).execute();

    const serviceCharges = (
      (
        (await PayrollRepository.getEmployeeByUnionAffiliation(
          memberIdDummy,
        )) as Employee
      ).getAffiliation() as UnionAffiliation
    ).getServiceCharges();

    expect(serviceCharges.length).toBe(1);
    expect(serviceCharges[0].getAmount()).toBe(memberServiceChargeAmountDummy);
  });
});

it('WHEN execute method is called but memberID do not exist THEN throw exception', async () => {
  expect.assertions(1);
  try {
    await new AddServiceChargeUsecase(
      memberIdDummy,
      memberServiceChargeAmountDummy,
    ).execute();
  } catch (error) {
    expect(error.message).toBe(MEMBER_DO_NOT_EXIST);
  }
});
