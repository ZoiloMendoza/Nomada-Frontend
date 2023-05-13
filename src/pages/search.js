import NavbarTwo from '@/components/Navbar/NavbarTwo';
import SearchBar from '@/components/Search/Search';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';
import RestaurantCard from '@/components/Search/RestaurantCard';
import MapButton from '@/components/common/MapButton';
import Footer from '@/components/Footer/Footer';
import { cityData } from '@/components/Search/cityData';
import { restaurantData } from '@/components/Search/restaurantData';

export default function Search() {
  return (
    <>
      <NavbarTwo />

      <SearchBar />

      <Box>
        {/*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/}
        <CityCard contentApi={cityData} />
      </Box>

      <Box>
        {/*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/}
        <RestaurantCard restaurantData={restaurantData.data} />
      </Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>

      <Footer />
    </>
  );
}
