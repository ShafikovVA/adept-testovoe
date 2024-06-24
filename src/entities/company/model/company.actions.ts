import { IPaginateData, paginate } from '@shared/helpers/paginate';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import { ICompany } from '../types/ICompany';
import { initialCompanies } from './initialCompanies';

export const fetchPaginatedCompanies = (page: number): Promise<IPaginateData<ICompany[]>> => new Promise<IPaginateData<ICompany[]>>((resolve) => {
  setTimeout(() => resolve(paginate<ICompany[]>(initialCompanies, 20, page)), 1000);
});

export const getPaginatedCompanies = createAsyncThunk('companies', async (page: number, thunkApi) => {
  try {
    const response = await fetchPaginatedCompanies(page);
    return response;
  } catch (error) {
    thunkApi.rejectWithValue({ error });
  }
});
