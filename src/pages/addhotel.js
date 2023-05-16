import Head from 'next/head';

import AddHotel from '@/components/AddHotel/AddHotel';

export default function AddNewHotel() {
  return (
    <>
      <Head>
        <title>Nomada</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/img/logo1.svg' />
      </Head>

      <AddHotel />
    </>
  );
}
