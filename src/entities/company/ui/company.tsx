import {
  ChangeEvent, memo, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { ICompany } from '../types/ICompany';
import styles from './company.module.scss';
import { editCompany } from '../model/company.slice';

interface ICompanyProps extends Omit<ICompany, 'employees'> {
  employeesLength: number;
}

export const Company = memo((props: ICompanyProps) => {
  const { title, active, employeesLength } = props;
  const dispatch = useDispatch();
  const [isActive, setActive] = useState<boolean>(active || false);

  useEffect(() => {
    setActive(active || false);
  }, [active]);

  useEffect(() => {
    dispatch(editCompany({ ...props, active: isActive }));
  }, [isActive]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };
  return (
    <tr className={`${styles['company-item']} ${isActive && styles.active}`}>
      <td className={styles.td}>
        <input type="checkbox" onChange={changeHandler} checked={isActive} />
      </td>
      <td className={styles.td}>
        ({employeesLength}) {title}
      </td>
    </tr>
  );
});
