import React from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, InputBase, Paper, Toolbar } from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 64,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  const handleSearch = (event) => {
    event.preventDefault();
    // Add code to handle search
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <Toolbar className={classes.toolbar}>
        <Link href='/'>
          <IconButton edge='start' color='inherit' aria-label='back'>
            <ArrowBack />
          </IconButton>
        </Link>

        <form onSubmit={handleSearch}>
          <InputBase className={classes.input} placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
          <IconButton type='submit' aria-label='search'>
            <Search />
          </IconButton>
        </form>
      </Toolbar>
    </Paper>
  );
}
