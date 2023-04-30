import BoardingPassCardWrapper from '@/components/CrearViaje/CrearViaje';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
export default function Crear() {
  return (
    <>
      <Head>
        <title>Nomada</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div>
          <BoardingPassCardWrapper />
        </div>
      </main>
    </>
  );
}
