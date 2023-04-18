import { Employee } from './employee/domain/employee';

export const DB = {
  employees: new Map<string, Employee>(),
  unionAffiliations: new Map<string, Employee>(),
};
