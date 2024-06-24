import { BsPlusCircle, BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import { useInView } from 'react-intersection-observer';
import { Company } from '@entities/company/ui/company';
import { useCompany } from '@entities/company/hooks/useCompany';
import { Modal } from '@/shared/ui/modal';
import { AddOrEditCompanyModal } from './addOrEditCompany.modal';
import styles from './companies.module.scss';
import { ICompanies } from '@/entities/company/types/ICompanies';
import { Loader } from '@/shared/ui/loader';
import { removeCompany } from '@/entities/company/model/company.slice';
import { getPaginatedCompanies } from '@/entities/company/model/company.actions';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const Companies = () => {
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();

  const [isActive, setActive] = useState<boolean>(false);
  const companiesRef = useRef<HTMLTableSectionElement>(null);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [pageCompany, setPageCompany] = useState<number>(1);
  const { companies, isLoading, pages }: ICompanies = useCompany().companies;
  const { activeCompanies } = useCompany();

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
    if (activeCompanies.length === 0) return;
    dispatch(removeCompany(activeCompanies.flatMap(({ id }) => id)));
  };

  useEffect(() => {
    if (pageCompany < pages) {
      dispatch(getPaginatedCompanies(pageCompany));
      setPageCompany(pageCompany + 1);
    }
  }, [inView, pages]);

  return (
    <div className={styles.companies}>
      <div className={styles['title-block']}>
        <p className={styles.title}>Компании ({companies.length})</p>
        <span className={styles.buttons}>
          {companies.filter((company) => company.active).length === 1 && (
            <button type="button" className={styles['tools-button']} onClick={addButtonHandler}>
              {' '}
              <BsPencilSquare />{' '}
            </button>
          )}
          <button type="button" className={styles['tools-button']} onClick={editButtonHandler}>
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
        <thead className={styles.thead}>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={changeHandler}
                checked={isActive && companies.length === activeCompanies.length}
              />{' '}
            </th>
            <th>Выбрать все</th>
          </tr>
        </thead>
        <tbody ref={companiesRef} className={styles.thead}>
          {companies.map((companyItem) => (
            <Company key={companyItem.id} {...companyItem} active={isActive} />
          ))}
          <tr ref={ref}>
            {isLoading && (
              <>
                <td className={styles.loader}>
                  <Loader />
                </td>
                <td>Загрузка...</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      <Modal
        isOpen={openEditModal || openAddModal}
        closeModal={() => {
          setOpenEditModal(false);
          setOpenAddModal(false);
        }}
      >
        <AddOrEditCompanyModal
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
