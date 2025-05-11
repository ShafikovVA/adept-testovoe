import { ICompany } from './ICompany';

export interface ICompanies {
  isLoading: boolean;
  pages: number;
  companies: ICompany[];
  companiesLength: number;
}

export interface ICompanyForm extends Omit<ICompany, 'employees'> {}

export interface ICompanyEditForm extends Omit<ICompany, 'employees'> {
  index: number;
}
