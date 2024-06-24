import { ReactNode, MouseEvent, useEffect } from 'react';
import { BsXCircle } from 'react-icons/bs';
import styles from './modal.module.scss';

interface IAddModal {
  isOpen: boolean;
  children?: ReactNode;
  closeModal?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export const Modal = (props: IAddModal) => {
  const { isOpen, children, closeModal } = props;
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
    if (closeModal && event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (closeModal && event.key === 'Escape') {
        closeModal();
      }
    });
    return document.removeEventListener('keydown', (event) => {
      if (closeModal && event.key === 'Escape') {
        closeModal();
      }
    });
  }, []);

  return (
    isOpen && (
      <div className={styles['model-container']} onClick={onClickOutside}>
        <div className={styles['model-body']}>
          <button type="button" className={styles['model-close-button']} onClick={closeModal}>
            {' '}
            <BsXCircle />
          </button>
          {children}
        </div>
      </div>
    )
  );
};
