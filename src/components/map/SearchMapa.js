import React from 'react';
import { IconButton, InputBase, Paper, Toolbar } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
const styles = {
  root: {
    flexGrow: 1,
    height: 64,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft: '10px',
    flex: 1,
  },
};

export default function SearchBar() {
  const router = useRouter();
  const { id } = router.query;
  const handleSearch = (event) => {
    event.preventDefault();
    // Add code to handle search
  };

  return (
    <Paper sx={styles.root} elevation={2}>
      <Toolbar sx={styles.toolbar}>
        <Link href={`/itinerary?id=${id}`}>
          <IconButton edge='start' color='inherit' aria-label='back'>
            <ArrowBack />
          </IconButton>
        </Link>

        <form onSubmit={handleSearch}>
          <InputBase sx={styles.input} placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
          <IconButton type='submit' aria-label='search'>
            <Search />
          </IconButton>
        </form>
      </Toolbar>
    </Paper>
  );
}
