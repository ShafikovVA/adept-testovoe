import {ReactNode, MouseEvent, useEffect, memo} from 'react';
import { BsXCircle } from 'react-icons/bs';
import styles from './modal.module.scss';
import {useDispatch} from "react-redux";
import {closeModal} from "@shared/ui/modal/modal.slice.ts";

interface IAddModal {
  isOpen: boolean;
  children?: ReactNode;
}

export const Modal = memo((props: IAddModal) => {
  const { isOpen, children } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = '16px';
    } else {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('margin-right');
    }
  }, [isOpen]);

  const onClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dispatch(closeModal());
      }
    });
    return document.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dispatch(closeModal());
      }
    });
  }, []);

  return (
    isOpen && (
      <div className={styles['model-container']} onClick={onClickOutside}>
        <div className={styles['model-body']}>
          <button type="button" className={styles['model-close-button']} onClick={() => dispatch(closeModal())}>
            {' '}
            <BsXCircle />
          </button>
          {children}
        </div>
      </div>
    )
  );
});
