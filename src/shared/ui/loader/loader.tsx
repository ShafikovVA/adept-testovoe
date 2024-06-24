import { VscLoading } from 'react-icons/vsc';
import styles from './loader.module.scss';

export const Loader = () => (
  <div>
    <VscLoading className={styles.loader} />
  </div>
);
