import Head from 'next/head';
import styles from '@/styles/Home.module.css';
//import Navbar from '@/components/Navbar/Navbar';
//import Formulario from '@/components/Registro/formulario';
//import BoxLogin from '@/components/Login/BoxLogin';
import CardMisViajes from '@/components/misViajes/CardMisViajes';

export default function Home() {
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
          <CardMisViajes />
        </div>
      </main>
    </>
  );
}
