import Calendario from '@/components/Calendario/Calendario';
import Head from 'next/head';
import styles from '@/styles/Crear-viaje.module.css';

export default function Crear() {
  return (
    <>
      <Head>
        <title>Nomada</title>
      </Head>
      <main className={styles.main}>
        <div>
          <Calendario />
        </div>
      </main>
    </>
  );
}
