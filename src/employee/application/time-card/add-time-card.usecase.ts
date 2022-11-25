import {
  EMPLOYEE_DO_NOT_EXIST,
  EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION,
} from '../../domain/errors/custom-messages';
import { HourlyClassification } from '../../domain/payment-classification/hourly-classification';
import { TimeCard } from '../../domain/time-card';
import { Transaction } from '../../domain/transacction';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';

export class AddTimeCardUsecase implements Transaction {
  constructor(
    private employeeId: string,
    private date: Date,
    private hours: number,
  ) {}

  async execute() {
    const employee = await PayrollRepository.getEmployee(this.employeeId);

    if (!employee) {
      throw new Error(EMPLOYEE_DO_NOT_EXIST);
    }

    const classification = employee.getPaymentClassification();

    if (!(classification instanceof HourlyClassification)) {
      throw new Error(EMPLOYEE_IS_NOT_HOURLY_CLASSIFICATION);
    }

    const newTimeCard = new TimeCard(this.date, this.hours);
    classification.addTimeCard(newTimeCard);

    employee.setPaymentClassification(classification);
    await PayrollRepository.addEmployee(employee);
  }
}
