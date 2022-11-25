import {
  employeeAddressDummy,
  employeeCommissionRateDummy,
  employeeHourlyRateDummy,
  employeeIdDummy,
  employeeNameDummy,
  employeeSalaryDummy,
  errorDummy,
  saleReceiptAmountDummy,
  saleReceiptDateDummy,
} from '../../../../test/dummies';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';
import { AddSalaryEmployeeUsecase } from '../employee/add/salary/add-salary-employee.usecase';
import {
  EMPLOYEE_DO_NOT_EXIST,
  EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION,
} from '../../domain/errors/custom-messages';
import { CommissionClassification } from '../../domain/payment-classification/commission-classification';
import { AddSaleReceiptUsecase } from './add-sale-receipt';
import { AddCommissionedEmployeeUsecase } from '../employee/add/commission/add-commissioned-employee.usecase';

describe('addSaleReceipt usecase ', () => {
  describe('execute method', () => {
    afterEach(() => {
      PayrollRepository.deleteEmployee(employeeIdDummy);
    });

    it('WHEN execute method is called THEN a sale receipt should be added', async () => {
      await new AddCommissionedEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeSalaryDummy,
        employeeCommissionRateDummy,
      ).execute();

      const addSaleReceipt = new AddSaleReceiptUsecase(
        employeeIdDummy,
        saleReceiptDateDummy,
        saleReceiptAmountDummy,
      );

      await addSaleReceipt.execute();

      const employeeCommissionClassification: CommissionClassification = (
        await PayrollRepository.getEmployee(employeeIdDummy)
      ).getPaymentClassification() as CommissionClassification;

      expect(employeeCommissionClassification.getSalesReceipt().length).toBe(1);
      expect(
        employeeCommissionClassification.getSalesReceipt()[0].getDate(),
      ).toEqual(saleReceiptDateDummy);
      expect(
        employeeCommissionClassification.getSalesReceipt()[0].getAmount(),
      ).toEqual(saleReceiptAmountDummy);
    });

    it('WHEN execute method is called but employee id is not hourly classification THEN throw a exeption', async () => {
      await new AddSalaryEmployeeUsecase(
        employeeIdDummy,
        employeeNameDummy,
        employeeAddressDummy,
        employeeHourlyRateDummy,
      ).execute();

      const addSaleReceipt = new AddSaleReceiptUsecase(
        employeeIdDummy,
        saleReceiptDateDummy,
        saleReceiptAmountDummy,
      );

      expect.assertions(1);
      try {
        await addSaleReceipt.execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION);
      }
    });

    it('WHEN execute method is called but employee id do not exist THEN throw a exeption', async () => {
      const addSaleReceipt = new AddSaleReceiptUsecase(
        employeeIdDummy,
        saleReceiptDateDummy,
        saleReceiptAmountDummy,
      );

      expect.assertions(1);
      try {
        await addSaleReceipt.execute();
      } catch (error) {
        expect(error.message).toBe(EMPLOYEE_DO_NOT_EXIST);
      }
    });

    it('WHEN execute method is called but occurrs db error THEN throw a exeption', async () => {
      jest
        .spyOn(PayrollRepository, 'getEmployee')
        .mockRejectedValue(errorDummy);

      const addSaleReceipt = new AddSaleReceiptUsecase(
        employeeIdDummy,
        saleReceiptDateDummy,
        saleReceiptAmountDummy,
      );

      expect.assertions(1);
      try {
        await addSaleReceipt.execute();
      } catch (error) {
        expect(error).toEqual(errorDummy);
      }
    });
  });
});
