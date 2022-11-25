import { Transaction } from '../../../domain/transacction';
import { PayrollRepository } from '../../../infraestructure/repositories/payroll.repository';

export class DeleteEmployeeUsecase implements Transaction {
  constructor(protected id: string) {}
  async execute() {
    await PayrollRepository.deleteEmployee(this.id);
  }
}
