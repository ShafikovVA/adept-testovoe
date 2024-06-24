import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as CompanyReducer } from '@entities/company/model/company.slice';

const reducers = combineReducers({
  companies: CompanyReducer,
});

export const store = configureStore({
  reducer: reducers,
});
