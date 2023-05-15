import Head from 'next/head';
import NavbarTwo from '@/components/Navbar/NavbarTwo';
import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import { cityData } from '@/components/Search/cityData';
import RestaurantCard from '@/components/Search/RestaurantCard';
import { restaurantData } from '@/components/Search/restaurantData';
import Footer from '@/components/Footer/Footer';
import { getData } from './api/proxy/restaurantSearch';
//import Spinner from '@/components/common/Spinner';
import axios from 'axios';
//import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';
//import axios from 'axios';

export default function Search({ contentApi }) {
  console.log(contentApi);
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

      <Box>
        {
          /*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/
          <CityCard contentApi={cityData} />
        }
      </Box>
      <Box>
        {
          /*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/
          <RestaurantCard restaurantData={restaurantData.data} />
        }
      </Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>

      <Footer />
    </>
  );
}
export const getServerSideProps = async (context) => {
  //let contentApi = [];
  const params = context.query;
  console.log(params);
  try {
    //const contentApi = await axios.get('./api/proxy/tripadvisor');

    const contentApi = await getData(params);
    // console.log('response', contentApi);
    return {
      props: {
        contentApi: contentApi,
      },
    };
  } catch (error) {
    return {
      props: {
        contentApi: { error: JSON.stringify(error) },
      },
    };
  }
};
