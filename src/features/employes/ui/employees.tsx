import { BsPlusCircle, BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import { ChangeEvent, useState } from 'react';
import { Employee } from '@entities/employee/ui/employee';
import { useDispatch } from 'react-redux';
import { Modal } from '@/shared/ui/modal';
import { AddOrEditEmployeeModal } from './addOrEditEmployee.modal';
import styles from './emplyees.module.scss';
import { useCompany } from '@/entities/company/hooks/useCompany';
import { removeEmployee } from '@/entities/company/model/company.slice';

export const Employees = () => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { activeCompanies } = useCompany();

  const activeEmployees = activeCompanies.length > 0 ? activeCompanies[0].employees.filter(({ active }) => active) : [];

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  const addButtonHandler = () => {
    setOpenAddModal(true);
  };
  const editButtonHandler = () => {
    setOpenEditModal(true);
  };

  const removeButtonHandler = () => {
    dispatch(
      removeEmployee({
        companyId: activeCompanies[0].id,
        employeesId: activeEmployees.flatMap(({ id }) => id),
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
          Сотрудники {activeCompanies.length === 1 && `(${activeCompanies[0].employees.length})`}
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
            && activeCompanies[0].employees.map((employeeItem) => (
              <Employee key={employeeItem.id} {...employeeItem} active={isActive} companyId={activeCompanies[0].id} />
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={openAddModal || openEditModal}
        closeModal={() => {
          setOpenEditModal(false);
          setOpenAddModal(false);
        }}
      >
        <AddOrEditEmployeeModal
          isEdit={openEditModal}
          onSuccess={() => {
            setOpenEditModal(false);
            setOpenAddModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
