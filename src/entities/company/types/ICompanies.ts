import { ICompany } from './ICompany';

export interface ICompanies {
  isLoading: boolean;
  pages: number;
  companies: ICompany[];
}
