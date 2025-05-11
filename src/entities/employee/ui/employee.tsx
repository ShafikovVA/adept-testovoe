import {
  memo, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { IEmployee } from '../types/IEmployee';
import styles from './employee.module.scss';
import {
  addActiveEmployee, removeActiveEmployee
} from "@entities/company/model/activeCompanies.slice.ts";

interface IEmployeeProps extends IEmployee {
  companyIndex: number;
  index: number;
  isActive?: boolean;
}

export const Employee = memo((props: IEmployeeProps) => {
  const {
    firstName, lastName, jobTitle, companyIndex, index, isActive,
  } = props;
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(isActive)

  const changeHandler = () => {
    if(inputRef.current?.checked){
      dispatch(addActiveEmployee({
        companyIndex,
        employeeIndex: index,
      }));
      setActive(true);
    }
    else {
      dispatch(removeActiveEmployee({
        companyIndex,
        employeeIndex: index,
      }));
      setActive(false);
    }
  };



  return (
    <tr className={`${styles['employee-item']} ${active && styles.active}`}>
      <td className={styles.td}>
        <input ref={inputRef} type="checkbox" onChange={changeHandler} checked={active} />
      </td>
      <td className={styles.td}>{lastName}</td>
      <td className={styles.td}>{firstName}</td>
      <td className={styles.td}>{jobTitle}</td>
    </tr>
  );
});
