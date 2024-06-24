import { ReactNode } from 'react';
import styles from './container.module.scss';

interface IContainerProps {
  children?: ReactNode;
}

export const Container = (props: IContainerProps) => {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
};
