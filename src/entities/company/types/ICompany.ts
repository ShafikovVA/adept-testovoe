import { IEmployee } from '@/entities/employee/types/IEmployee';

export interface ICompany {
  title: string;
  employees: IEmployee[];
}
