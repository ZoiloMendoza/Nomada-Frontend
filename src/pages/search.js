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
