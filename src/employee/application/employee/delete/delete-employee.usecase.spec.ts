import { Employee } from '../../../domain/employee';
import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';
import {
  employeeAddressDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
} from '../../../../../test/dummies';
import { AddSalaryEmployeeUsecase } from '../add/salary/add-salary-employee.usecase';
import { DeleteEmployeeUsecase } from './delete-employee.usecase';

describe('deleteEmployee usecase ', () => {
  describe('execute method', () => {
    afterEach(() => {
      PayrollRepository.deleteEmployee(employeeIdDummy);
    });

    it('WHEN execute method is called THEN a commissioned employee should be deleted', async () => {
      const addUsecase = new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
      );

      addUsecase.execute();

      let employee: Employee = await PayrollRepository.getEmployee(
        employeeIdDummy,
      );

      expect(employee).not.toBeNull();

      const removeUsecase = new DeleteEmployeeUsecase(employee.getId());
      removeUsecase.execute();

      employee = await PayrollRepository.getEmployee(employeeIdDummy);

      expect(employee).toBeNull();
    });
  });
});
