import { NestFactory } from '@nestjs/core';
import { PayrollApplicationModule } from './application-payroll/payroll-application.module';
import { PayrollApplicationService } from './application-payroll/payroll-application.service';

async function bootstrap() {
  const app = await NestFactory.create(PayrollApplicationModule);
  await app.get(PayrollApplicationService).init();
}
bootstrap();
