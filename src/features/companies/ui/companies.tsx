import { BsPlusCircle, BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import {
  ChangeEvent, useCallback, useEffect, useRef, useState,
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

interface ICompaniesOpenModal {
  open: boolean,
  isEditable?: boolean,
}

export const Companies = () => {
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();

  const [isActive, setActive] = useState<boolean>(false);
  const companiesRef = useRef<HTMLTableSectionElement>(null);
  const [openModal, setOpenModal] = useState<ICompaniesOpenModal>({
    open: false,
    isEditable: false
  });
  const [pageCompany, setPageCompany] = useState<number>(1);
  const { companies, isLoading, pages }: ICompanies = useCompany().companies;
  const { activeCompanies } = useCompany();

  const openSimpleModal = () => setOpenModal({
    open: true,
  });

  const  openEditableModal = () => setOpenModal({
    open: true,
    isEditable: true,
  })

  const resetModal = () => setOpenModal({
    open: false,
    isEditable: false
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  const addButtonHandler = useCallback(() => {
    openSimpleModal()
  }, [setOpenModal]);

  const editButtonHandler = () => {
    if (activeCompanies.length === 1) {
      openEditableModal();
    }
  };

  const removeButtonHandler = () => {
    if (activeCompanies.length === 0) return;
    dispatch(removeCompany(activeCompanies));
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
          {activeCompanies.length === 1 && (
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
          {companies.map((companyItem, index) => (
            <Company key={companyItem.title} {...companyItem} isActive={activeCompanies.includes(index)} index={index} employeesLength={companyItem.employees.length} />
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
      {
        openModal.open ? (
          <Modal
            isOpen={openModal.open}
            closeModal={resetModal}
          >
            <AddOrEditCompanyModal
              isEditable={openModal.isEditable}
              onSuccess={resetModal}
            />
          </Modal>
        ) : ''
      }

    </div>
  );
};
