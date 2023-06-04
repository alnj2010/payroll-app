import { Employee } from '../payroll-domain/employee';

export interface ERepository {
  create(employee: Employee);
  read(id: string): Employee;
  readAll(): Employee[];
  delete(id: string);
  clear(): void;
}
