import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Head from 'next/head';
import Add from '@/components/Add/Add';
import PlaceCards from '@/components/Add/PlaceCards';
import Footer from '@/components/Footer/Footer';

import { data } from '@/components/Add/data';

export default function AddItem() {
  return (
    <>
      <Head>
        <title>Nomada</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/img/logo1.svg' />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
      </Head>
      <NavbarTwo />
      <Add />
      <PlaceCards data={data} />

      <Footer />
    </>
  );
}