import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: {
  [key: number]: number[]
} = {};

export const activeCompaniesSlice = createSlice({
  name: 'activeCompanies',
  initialState,
  reducers: {
    addActiveCompany: (state, action: PayloadAction<number>) => {
      state[action.payload] = [];
      return state;
    },
    removeActiveCompany: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
      return state;
    },
    addActiveEmployee: (state, action: PayloadAction<{companyIndex: number, employeeIndex: number}>) => {
      const { companyIndex, employeeIndex } = action.payload;
      state[companyIndex].push(employeeIndex);
      return state;
    },
    removeActiveEmployee: (state, action: PayloadAction<{companyIndex: number, employeeIndex: number}>) => {
      const { companyIndex, employeeIndex } = action.payload;
      state[companyIndex].splice(employeeIndex, 1);
      return state;
    },
  },
});

export const { actions, reducer } = activeCompaniesSlice;

export const { addActiveCompany, removeActiveCompany, addActiveEmployee, removeActiveEmployee } = actions;