import { PaymentClassification } from './payment-classification';
import { PaymentMethod } from './payment-method';
import { PaymentScheduler } from './payment-scheduler';

export class Employee {
  private paymentClassification: PaymentClassification;
  private paymentMethod: PaymentMethod;
  private paymentScheduler: PaymentScheduler;

  constructor(
    private id: string,
    private name: string,
    private address: string,
  ) {}

  setPaymentClassification(classification: PaymentClassification) {
    this.paymentClassification = classification;
  }

  setPaymentMethod(method: PaymentMethod) {
    this.paymentMethod = method;
  }

  setPaymentScheduler(scheduler: PaymentScheduler) {
    this.paymentScheduler = scheduler;
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }

  getAddress(): string {
    return this.address;
  }

  getPaymentClassification(): PaymentClassification {
    return this.paymentClassification;
  }

  getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  getPaymentScheduler(): PaymentScheduler {
    return this.paymentScheduler;
  }
}
