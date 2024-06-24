import { FormEvent, useState } from 'react';
import { IEmployee } from '@entities/employee/types/IEmployee';
import { useDispatch } from 'react-redux';
import styles from './emplyees.module.scss';
import { useCompany } from '@/entities/company/hooks/useCompany';
import { addEmployee, editEmployee } from '@/entities/company/model/company.slice';

interface IEmployeeModal {
  onSuccess?: () => void;
  isEdit?: boolean;
}

export const AddOrEditEmployeeModal = (props: IEmployeeModal) => {
  const { onSuccess, isEdit } = props;
  const { activeCompanies } = useCompany();
  const activeEmployees = activeCompanies.length > 0 ? activeCompanies[0].employees.filter(({ active }) => active) : [];
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState<Omit<IEmployee, 'id' | 'companyId'>>({
    firstName: isEdit ? activeEmployees[0].firstName : '',
    lastName: isEdit ? activeEmployees[0].lastName : '',
    jobTitle: isEdit ? activeEmployees[0].jobTitle : '',
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEdit) {
      dispatch(
        editEmployee({
          employee: {
            ...formInputs,
            active: activeEmployees[0].active,
            id: activeEmployees[0].id,
          },
          companyId: activeCompanies[0].id,
        }),
      );
    } else {
      dispatch(
        addEmployee({
          ...formInputs,
          companyId: activeCompanies[0].id,
          employee: { ...formInputs },
        }),
      );
    }
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={styles['form-container']}>
      <p className={styles.title}>{isEdit ? 'Редактировать' : 'Добавить'} сотрудника</p>
      <form onSubmit={submitHandler}>
        <div className={styles['form-body']}>
          <label htmlFor="addLastName">Фамилия</label>
          <input
            id="addLastName"
            type="text"
            value={formInputs.lastName}
            onChange={(event) => {
              setFormInputs({ ...formInputs, lastName: event.target.value });
            }}
            placeholder="Фамилия"
          />
          <label htmlFor="addFirstName">Имя</label>
          <input
            id="addFirstName"
            type="text"
            value={formInputs.firstName}
            onChange={(event) => {
              setFormInputs({ ...formInputs, firstName: event.target.value });
            }}
            placeholder="Имя"
          />
          <label htmlFor="addJobTitle">Должность</label>
          <input
            id="addJobTitle"
            type="text"
            value={formInputs.jobTitle}
            onChange={(event) => {
              setFormInputs({ ...formInputs, jobTitle: event.target.value });
            }}
            placeholder="Должность"
          />
        </div>
        <button type="submit">{isEdit ? 'Редактировать' : 'Добавить'}</button>
      </form>
    </div>
  );
};
