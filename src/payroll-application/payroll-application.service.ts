import { Injectable } from '@nestjs/common';
import { TransactionSource } from './transaction-source';
import { Transaction } from '../domain/transaction';

@Injectable()
export class PayrollApplicationService {
  constructor(private transactionSource: TransactionSource) {}
  init(): void {
    while (true) {
      const transaction: Transaction = this.transactionSource.getTransaction();
      transaction.execute();
    }
  }
}
