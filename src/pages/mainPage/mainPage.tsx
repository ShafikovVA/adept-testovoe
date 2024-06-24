import { Companies } from '@/features/companies/ui/companies';
import { Employees } from '@/features/employes/ui/employees';
import { Container } from '@/shared/ui/container';
import styles from './mainPage.module.scss';

export const MainPage = () => {
  return (
    <div className={styles.content}>
      <header />
      <main>
        <section className={styles.section}>
          <Container>
            <Companies />
            <Employees />
          </Container>
        </section>
      </main>
      <footer />
    </div>
  );
};
