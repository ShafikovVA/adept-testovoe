import {
  memo, useCallback, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { ICompany } from '../types/ICompany';
import styles from './company.module.scss';
import {addActiveCompany, removeActiveCompany} from "@entities/company/model/activeCompanies.slice.ts";

interface ICompanyProps extends Omit<ICompany, 'employees'> {
  index: number;
  isActive: boolean;
  employeesLength: number;
}

export const Company = memo((props: ICompanyProps) => {
  const { title, employeesLength, index, isActive } = props;
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(isActive)

  const changeHandler = useCallback(() => {

    if(inputRef.current?.checked){
      dispatch(addActiveCompany(index));
      setActive(true);
    }
    else {
      dispatch(removeActiveCompany(index));
      setActive(false);
    }
  }, [inputRef]);

  return (
    <tr className={`${styles['company-item']} ${active && styles.active}`}>
      <td className={styles.td}>
        <input ref={inputRef} type="checkbox" onChange={changeHandler} checked={active} />
      </td>
      <td className={styles.td}>
        ({employeesLength}) {title}
      </td>
    </tr>
  );
});
