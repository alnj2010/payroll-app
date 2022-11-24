import { Transaction } from 'src/employee/domain/transacction';
import { PayrollRepository } from '../../infraestructure/repositories/payroll.repository';

export class DeleteEmployeeUsecase implements Transaction {
  constructor(protected id: string) {}
  execute() {
    PayrollRepository.deleteEmployee(this.id);
  }
}
