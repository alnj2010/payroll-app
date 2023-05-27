import { Module } from '@nestjs/common';
import { PayrollApplicationService } from './payroll-application/payroll-application.service';
import { TextParserTransaction } from 'src/text-parser/text-parser-transaction';

@Module({
  imports: [],
  controllers: [],
  providers: [PayrollApplicationService, TextParserTransaction],
})
export class PayrollApplicationModule {}
