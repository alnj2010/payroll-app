import { Employee } from './payroll-domain/employee';

export const DB = {
  employees: new Map<string, Employee>(),
  unionAffiliations: new Map<string, Employee>(),
};
