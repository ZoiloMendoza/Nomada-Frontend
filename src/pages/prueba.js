import Head from 'next/head';
import PopupForm from '@/components/common/PopupForm';

export default function Prueba() {
  return (
    <>
      <Head>
        <title>Nomada</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/img/logo1.svg' />
      </Head>

      <PopupForm />
    </>
  );
}
