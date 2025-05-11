import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as CompaniesReducer } from '@entities/company/model/company.slice';
import { reducer as ActiveCompaniesReducer } from '@entities/company/model/activeCompanies.slice';

const reducers = combineReducers({
  companies: CompaniesReducer,
  activeCompanies: ActiveCompaniesReducer,
});

export const store = configureStore({
  reducer: reducers,
});
