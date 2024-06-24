import {
  ChangeEvent, memo, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { ICompany } from '../types/ICompany';
import styles from './company.module.scss';
import { editCompany } from '../model/company.slice';

export const Company = memo((props: ICompany) => {
  const { title, active, employees } = props;
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
        ({employees.length}) {title}
      </td>
    </tr>
  );
});
