import { CommissionClassification } from '../../domain/payment-classification/commission-classification';
import {
  EMPLOYEE_DO_NOT_EXIST,
  EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION,
} from '../../domain/errors/custom-messages';
import { SaleReceipt } from '../../domain/sale-receipt';
import { Transaction } from '../../domain/transacction';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';

export class AddSaleReceiptUsecase implements Transaction {
  constructor(
    private employeeId: string,
    private date: Date,
    private amount: number,
  ) {}

  async execute() {
    const employee = await PayrollRepository.getEmployee(this.employeeId);

    if (!employee) {
      throw new Error(EMPLOYEE_DO_NOT_EXIST);
    }

    const classification = employee.getPaymentClassification();

    if (!(classification instanceof CommissionClassification)) {
      throw new Error(EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION);
    }

    const newSaleReceipt = new SaleReceipt(this.date, this.amount);
    classification.addSaleReceipt(newSaleReceipt);

    employee.setPaymentClassification(classification);
    await PayrollRepository.addEmployee(employee);
  }
}
