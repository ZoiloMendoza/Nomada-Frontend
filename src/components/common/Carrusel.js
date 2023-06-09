import Slider from 'react-slick';
import Box from '@mui/material/Box';
import 'node_modules/slick-carousel/slick/slick.css';
import 'node_modules/slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Carrusel = ({ children }) => (
  <Box sx={{ width: '100%', margin: '3em 0', position: 'relative' }}>
    <Slider {...settings}>{children}</Slider>
  </Box>
);

export default Carrusel;
