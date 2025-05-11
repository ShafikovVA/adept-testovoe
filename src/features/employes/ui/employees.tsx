import { BsPlusCircle, BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import { ChangeEvent, useState } from 'react';
import { Employee } from '@entities/employee/ui/employee';
import { useDispatch } from 'react-redux';
import styles from './emplyees.module.scss';
import { useCompany } from '@/entities/company/hooks/useCompany';
import { removeEmployee } from '@/entities/company/model/company.slice';
import {closeModal, openModal} from "@shared/ui/modal/modal.slice.ts";
import {AddOrEditEmployeeModal} from "@features/employes/ui/addOrEditEmployee.modal.tsx";

export const Employees = () => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  const { companies, activeCompanies, activeEmployees} = useCompany();

  const prepareEmployees = Object.keys(activeCompanies).length > 0 ?
    activeCompanies.flatMap((index) => companies.companies[Number(index)].employees) : [];
  [];

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  const addButtonHandler = () => {
    dispatch(openModal({
      view: <AddOrEditEmployeeModal onSuccess={() => dispatch(closeModal())} />
    }))
  };
  const editButtonHandler = () => {
    dispatch(openModal({
      view: <AddOrEditEmployeeModal isEdit onSuccess={() => dispatch(closeModal())} />
    }))
  };

  const removeButtonHandler = () => {
    dispatch(
      removeEmployee({
        companyIndex: activeCompanies[0],
        employeesIndexes: activeEmployees,
      }),
    );
  };

  if (activeCompanies.length !== 1) {
    return null;
  }

  return (
    <div className={styles.employees}>
      <div className={styles['title-block']}>
        <p className={styles.title}>
          Сотрудники {activeEmployees.length === 1 && `(${activeEmployees.length})`}
        </p>
        <span className={styles.buttons}>
          {activeEmployees.length === 1 && (
            <button type="button" className={styles['tools-button']} onClick={editButtonHandler}>
              {' '}
              <BsPencilSquare />{' '}
            </button>
          )}
          <button type="button" className={styles['tools-button']} onClick={addButtonHandler}>
            {' '}
            <BsPlusCircle />{' '}
          </button>
          <button type="button" className={styles['tools-button']} onClick={removeButtonHandler}>
            {' '}
            <BsFillTrash3Fill />{' '}
          </button>
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={changeHandler} checked={isActive} />{' '}
            </th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Должность</th>
          </tr>
        </thead>
        <tbody>
          {activeCompanies.length === 1
            && prepareEmployees.map((employeeItem, index) => (
              <Employee key={employeeItem.firstName} isActive={activeEmployees.includes(index)} {...employeeItem} index={index} companyIndex={activeCompanies[0]} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
