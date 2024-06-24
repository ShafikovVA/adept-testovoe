import {
  ChangeEvent, memo, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { IEmployee } from '../types/IEmployee';
import styles from './employee.module.scss';
import { editEmployee } from '@/entities/company/model/company.slice';

interface IEmployeeProps extends IEmployee {
  companyId: number;
}

export const Employee = memo((props: IEmployeeProps) => {
  const {
    firstName, lastName, jobTitle, active, companyId,
  } = props;
  const [isActive, setActive] = useState(active || false);
  const dispatch = useDispatch();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  useEffect(() => {
    setActive(active || false);
  }, [active]);

  useEffect(() => {
    dispatch(
      editEmployee({
        employee: { ...props, active: isActive },
        companyId,
      }),
    );
  }, [isActive]);

  return (
    <tr className={`${styles['employee-item']} ${isActive && styles.active}`}>
      <td className={styles.td}>
        <input type="checkbox" onChange={changeHandler} checked={isActive} />
      </td>
      <td className={styles.td}>{lastName}</td>
      <td className={styles.td}>{firstName}</td>
      <td className={styles.td}>{jobTitle}</td>
    </tr>
  );
});
