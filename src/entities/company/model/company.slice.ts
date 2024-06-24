import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICompany } from '../types/ICompany';
import { getPaginatedCompanies } from './company.actions';
import { ICompanies } from '../types/ICompanies';
import { initialCompanies } from './initialCompanies';
import { IEmployee } from '@/entities/employee/types/IEmployee';

const companiesLength = initialCompanies.length;

const initialState: ICompanies = {
  isLoading: false,
  companies: [],
  pages: 2,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, { payload: company }: PayloadAction<Omit<ICompany, 'id' | 'active' | 'employees'>>) => {
      state.companies.unshift({
        ...company,
        id: companiesLength + state.companies.length + 1,
        employees: [],
      });
    },
    editCompany: (state, { payload: company }: PayloadAction<ICompany>) => {
      state.companies.splice(
        state.companies.findIndex((store) => store.id === company.id),
        1,
        company,
      );
    },
    removeCompany: (state, { payload: companies }: PayloadAction<number[]>) => {
      return {
        ...state,
        companies: state.companies.filter(({ id }) => !companies.includes(id)),
      } as ICompanies;
    },
    addEmployee: (
      state,
      { payload: { employee, companyId } }: PayloadAction<{ companyId: number; employee: Omit<IEmployee, 'id'> }>,
    ) => {
      return {
        ...state,
        companies: state.companies.map((company) => {
          if (company.id === companyId) {
            return {
              ...company,
              employees: [
                {
                  ...employee,
                  id:
                    state.companies
                      .filter(({ employees }) => employees.length > 0)
                      .flatMap(({ employees }) => employees).length + 1,
                },
                ...company.employees,
              ],
            };
          }
          return company;
        }),
      };
    },
    editEmployee: (
      state,
      { payload: { employee, companyId } }: PayloadAction<{ companyId: number; employee: IEmployee }>,
    ) => {
      const employees = state.companies.find(({ id }) => id === companyId)?.employees;
      employees?.splice(
        employees.findIndex((store) => store.id === employee.id),
        1,
        employee,
      );
    },
    removeEmployee: (
      state,
      { payload: { employeesId, companyId } }: PayloadAction<{ companyId: number; employeesId: number[] }>,
    ) => {
      return {
        ...state,
        companies: state.companies.map((company) => {
          if (company.id === companyId) {
            return {
              ...company,
              employees: company.employees.filter(({ id }) => !employeesId.includes(id)),
            };
          }
          return company;
        }),
      };
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
