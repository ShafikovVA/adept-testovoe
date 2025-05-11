import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getPaginatedCompanies } from './company.actions';
import {ICompanies, ICompanyEditForm, ICompanyForm} from '../types/ICompanies';
import {IEmployee} from '@/entities/employee/types/IEmployee';

const initialState: ICompanies = {
  isLoading: false,
  companies: [],
  pages: 2,
};


export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, { payload: company }: PayloadAction<ICompanyForm>) => {
      state.companies.push({
        ...company,
        employees: [],
      });
    },
    editCompany: (state, { payload: company }: PayloadAction<ICompanyEditForm>) => {
      state.companies.splice(
        company.index,
        1,
        {
          ...state.companies[company.index],
          ...company,
        },
      );
    },
    removeCompany: (state, { payload: companies }: PayloadAction<number[]>) => {
      return {
        ...state,
        companies: state.companies.filter((_, index) =>  !companies.includes(index)),
      } as ICompanies;
    },
    addEmployee: (
      state,
      { payload: { employee, companyIndex } }: PayloadAction<{ companyIndex: number; employee: IEmployee }>,
    ) => {
      state.companies[companyIndex].employees.push(employee);
      return state;
    },
    editEmployee: (
      state,
      { payload: { employee, employeeIndex, companyIndex } }: PayloadAction<{ companyIndex: number; employeeIndex:number, employee: IEmployee }>,
    ) => {
      const employees = state.companies[companyIndex].employees;
      employees?.splice(
        employeeIndex,
        1,
        employee,
      );
    },
    removeEmployee: (
      state,
      { payload: { employeesIndexes, companyIndex } }: PayloadAction<{ companyIndex: number; employeesIndexes: number[] }>,
    ) => {
      state.companies[companyIndex].employees = state.companies[companyIndex].employees.filter((_, index) => !employeesIndexes.includes(index));
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaginatedCompanies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPaginatedCompanies.fulfilled, (state, { payload: paginatedCompany }) => {
      if (!paginatedCompany) return;
      state.isLoading = false;
      state.pages = paginatedCompany.pages;
      state.companies = [...state.companies, ...paginatedCompany.data];
    });
  },
});

export const { actions, reducer } = companiesSlice;

export const {
  addCompany, editCompany, removeCompany, addEmployee, editEmployee, removeEmployee,
} = actions;
