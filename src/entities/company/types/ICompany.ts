import { IEmployee } from '@/entities/employee/types/IEmployee';

export interface ICompany {
  id: number;
  title: string;
  active?: boolean;
  employees: IEmployee[];
}
