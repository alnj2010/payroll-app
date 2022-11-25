import { Controller, Get } from '@nestjs/common';
import { AddSalaryEmployeeUsecase } from '../../application/employee/add/salary/add-salary-employee.usecase';

@Controller()
export class EmployeeController {
  constructor(private readonly appService: AddSalaryEmployeeUsecase) {}

  @Get()
  get(): string {
    return 'this.appService.getHello()';
  }
}
