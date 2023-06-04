import { Module } from '@nestjs/common';
import { PayrollApplicationService } from './payroll-application.service';
import { TextParserTransaction } from '../text-parser-transaction-source/text-parser-transaction';
import { EmployeeRepository } from '../payroll-repository-implementation/employee-repository';
import { UnionAffiliationsRepository } from '../payroll-repository-implementation/union-affiliation-repository';
import { TransactionFactoryImplementation } from '../transaction-implementation/transaction-factory-implementation';
import { PayrollFactoryImplementation } from '../payroll-implementations/payroll-factory-implementation';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PayrollApplicationService,
    TextParserTransaction,
    EmployeeRepository,
    UnionAffiliationsRepository,
    TransactionFactoryImplementation,
    PayrollFactoryImplementation,
  ],
})
export class PayrollApplicationModule {}
