import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './companies.module.scss';
import { ICompany } from '@/entities/company/types/ICompany';
import { useCompany } from '@/entities/company/hooks/useCompany';
import { addCompany, editCompany } from '@/entities/company/model/company.slice';

interface IAddCompanyModal {
  onSuccess?: () => void;
  isEditable?: boolean;
}

export const AddOrEditCompanyModal = (props: IAddCompanyModal) => {
  const { onSuccess, isEditable } = props;
  const dispatch = useDispatch();
  const companies = useCompany().companies;
  const { activeCompanies } = useCompany();

  const [formInputs, setFormInputs] = useState<Omit<ICompany, 'id' | 'active' | 'employees'>>({
    title: isEditable ? companies.companies[activeCompanies[0]]?.title :  '',
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditable) {
      dispatch(
        editCompany({
          ...formInputs,
          index: activeCompanies[0],
        }),
      );
    } else {
      dispatch(addCompany({ ...formInputs }));
    }
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={styles['form-container']}>
      <p className={styles.title}>{isEditable ? 'Редактировать' : 'Добавить' } компанию</p>
      <form onSubmit={submitHandler}>
        <div className={styles['form-body']}>
          <label htmlFor="addTitle">Название компании</label>
          <input
            id="addTitle"
            type="text"
            value={formInputs.title}
            onChange={(event) => {
              setFormInputs({ ...formInputs, title: event.target.value });
            }}
            placeholder="Название компании"
          />
        </div>
        <button type="submit">{isEditable ? 'Редактировать' : 'Добавить'}</button>
      </form>
    </div>
  );
};
