import Box from '@mui/material/Box';
import SearchBar from '@/components/AddHotel/SearchHotel';

import AddHotel from '@/components/AddHotel/AddHotel';

export default function AddNewHotel() {
  return (
    <Box sx={{ height: '100vh' }}>
      <SearchBar />
      <AddHotel />
    </Box>
  );
}
