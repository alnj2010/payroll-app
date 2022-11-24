import { Module } from '@nestjs/common';
import { EmployeeController } from './infraestructure/http/employee.controller';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [],
})
export class EmployeeModule {}
