import { useSelector } from 'react-redux';

export const useCompany = () => {
  const companies = useSelector((state: RootState) => state.companies);
  const activeItems = useSelector((state: RootState) => state.activeCompanies);
  const activeCompanies = Object.keys(activeItems).map(item => Number(item)) || [];
  const activeEmployees = activeItems[activeCompanies[0]] || [];

  return { companies, activeItems, activeCompanies, activeEmployees };
};
