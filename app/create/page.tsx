import s from './Create.module.css';
import { Logo, Text } from '@components/ui';
import { Form } from '@components/create';

export default function Create() {
  return (
    <main className={s.main}>
      <div className={s.background}>
        <div className={s.card}>
          <div className={s.title}>
            <Text variant="sectionHeading">Create Collection</Text>
            <Logo width={60} />
          </div>
          <Form />
        </div>
      </div>
    </main>
  );
}
