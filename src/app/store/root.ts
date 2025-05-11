import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as CompaniesReducer } from '@entities/company/model/company.slice';
import { reducer as ActiveCompaniesReducer } from '@entities/company/model/activeCompanies.slice';
import { reducer as ModalReducer } from '@shared/ui/modal/modal.slice';

const reducers = combineReducers({
  companies: CompaniesReducer,
  activeCompanies: ActiveCompaniesReducer,
  modal: ModalReducer,
});

export const store = configureStore({
  reducer: reducers,
});
