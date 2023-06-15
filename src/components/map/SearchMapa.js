import React from 'react';
import { IconButton, Paper, Toolbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
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

  return (
    <Paper sx={styles.root} elevation={2}>
      <Toolbar sx={styles.toolbar}>
        <Link href={`/itinerary?id=${id}`}>
          <IconButton edge='start' color='inherit' aria-label='back'>
            <ArrowBack />
          </IconButton>
        </Link>
      </Toolbar>
    </Paper>
  );
}
