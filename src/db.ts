import { Employee } from './domain/employee';

export const DB = {
  employees: new Map<string, Employee>(),
  unionAffiliations: new Map<string, Employee>(),
};
