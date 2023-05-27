import { NestFactory } from '@nestjs/core';
import { PayrollApplicationModule } from './payroll-application.module';
import { PayrollApplicationService } from './payroll-application/payroll-application.service';

async function bootstrap() {
  const app = await NestFactory.create(PayrollApplicationModule);
  await app.get(PayrollApplicationService).init();
}
bootstrap();
