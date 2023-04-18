import { Affiliation } from './affiliation';
import { PaymentClassification } from './payment-classification';
import { PaymentMethod } from './payment-method';
import { PaymentScheduler } from './payment-scheduler';

export class Employee {
  private paymentClassification: PaymentClassification;
  private paymentScheduler: PaymentScheduler;
  private paymentMethod: PaymentMethod;
  private affiliation: Affiliation;

  constructor(
    private id: string,
    private name: string,
    private address: string,
  ) {}

  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
  public getAddress(): string {
    return this.address;
  }
  public setAddress(address: string): void {
    this.address = address;
  }

  public getPaymentClassification(): PaymentClassification {
    return this.paymentClassification;
  }

  public setPaymentClassification(
    paymentClassification: PaymentClassification,
  ): void {
    this.paymentClassification = paymentClassification;
  }

  public getPaymentScheduler(): PaymentScheduler {
    return this.paymentScheduler;
  }

  public setPaymentScheduler(paymentScheduler: PaymentScheduler): void {
    this.paymentScheduler = paymentScheduler;
  }

  public getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  public setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.paymentMethod = paymentMethod;
  }
  public setAffiliation(affiliation: Affiliation) {
    this.affiliation = affiliation;
  }

  public getAffiliation(): Affiliation {
    return this.affiliation;
  }
}
