import { useSelector } from 'react-redux';

export const useCompany = () => {
  const companies = useSelector((state: RootState) => state.companies);
  const activeCompanies = companies ? companies.companies.filter((company) => company.active) : [];

  return { companies, activeCompanies };
};
