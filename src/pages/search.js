import Head from 'next/head';
import NavbarTwo from '@/components/Navbar/NavbarTwo';
import CityCard from '@/components/Search/cityCard';
import PlaceCards from '@/components/Add/PlaceCards';
import SearchBar from '@/components/Search/Search';

import Footer from '@/components/Footer/Footer';

import { cityData } from '@/components/Search/cityData';
import { data } from '@/components/Add/data';

import Box from '@mui/material/Box';

export default function Search() {
  return (
    <>
      <Head>
        <title>Nomada</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/img/logo1.svg' />
      </Head>
      <NavbarTwo />

      <SearchBar />

      <Box
        sx={{
          margin: 10,
        }}
      >
        <CityCard cityData={cityData} />

        <PlaceCards data={data} />
      </Box>

      <Footer />
    </>
  );
}
