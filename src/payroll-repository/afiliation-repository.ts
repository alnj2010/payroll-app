import { Employee } from '../payroll-domain/employee';

export interface AffiliationRepository {
  create(memberId: string, employee: Employee);
  read(memberId: string): Employee;
  delete(memberId: string);
  clear();
}
