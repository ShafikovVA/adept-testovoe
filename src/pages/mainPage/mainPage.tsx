import { Companies } from '@/features/companies/ui/companies';
import { Employees } from '@/features/employes/ui/employees';
import { Container } from '@/shared/ui/container';
import styles from './mainPage.module.scss';
import {Modal} from "@shared/ui/modal";
import {useModal} from "@shared/hooks/useModal.ts";
import {AddOrEditEmployeeModal} from "@features/employes/ui/addOrEditEmployee.modal.tsx";
import {AddOrEditCompanyModal} from "@features/companies/ui/addOrEditCompany.modal.tsx";

export const MainPage = () => {
  const { modal } = useModal();
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
      {
        modal.open ? (
          <Modal
            isOpen={modal.open}
          >
            {
              modal.view === 'companies' && (
                <AddOrEditCompanyModal {...modal.viewData} />
              )
            }
            {
              modal.view === 'employees' && (
                <AddOrEditEmployeeModal {...modal.viewData} />
              )
            }
          </Modal>
        ) : ''
      }
    </div>
  );
};
