import { createTheme } from '@mui/material/styles';

const customColor = '#E91E63';
const theme = createTheme({
  /* typography: {
    fontFamily: ['Inter'].join(','),
  },*/
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'bold' },
          style: {
            color: 'white',
            backgroundColor: customColor,
            borderRadius: '10px',
            padding: '10px 20px',
            textTransform: 'none',
            fontFamily: 'Inter, sans-serif',
          },
        },
      ],
    },
  },

  palette: {
    primary: {
      main: '#E91E63',
    },
    secondary: {
      main: '#2B2E4A',
    },
    terceary: {
      main: '#6C6D7F',
    },
  },
  MuiTextField: {
    defaultProps: {
      style: {
        backgroundColor: 'gray',
        borderRadius: '50px',
        padding: '10px 20px',
        textTransform: 'none',
      },
    },
  },
});

export default theme;
