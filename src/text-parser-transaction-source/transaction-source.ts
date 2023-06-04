import { Transaction } from '../transaction/transaction';

export interface TransactionSource {
  getTransaction(): Transaction;
}
