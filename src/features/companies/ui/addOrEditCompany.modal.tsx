import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './companies.module.scss';
import { ICompany } from '@/entities/company/types/ICompany';
import { useCompany } from '@/entities/company/hooks/useCompany';
import { addCompany, editCompany } from '@/entities/company/model/company.slice';

interface IAddCompanyModal {
  onSuccess?: () => void;
  isEdit?: boolean;
}

export const AddOrEditCompanyModal = (props: IAddCompanyModal) => {
  const { onSuccess, isEdit } = props;
  const dispatch = useDispatch();
  const editableCompany = useCompany().activeCompanies[0];

  const [formInputs, setFormInputs] = useState<Omit<ICompany, 'id' | 'active' | 'employees'>>({
    title: isEdit ? '' : editableCompany.title,
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEdit) {
      dispatch(
        editCompany({
          ...formInputs,
          id: editableCompany.id,
          active: editableCompany.active,
          employees: editableCompany.employees,
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
      <p className={styles.title}>{isEdit ? 'Добавить' : 'Редактировать'} компанию</p>
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
        <button type="submit">{isEdit ? 'Добавить' : 'Редактировать'}</button>
      </form>
    </div>
  );
};
