import { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const styles = {
  root: {
    display: 'block',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'inlineFlex',
    margin: '0 0 3em 3em',
    zIndex: 99,
    transition: 'opacity 0.3s',
    opacity: 0,
    '&.show': {
      opacity: 1,
    },
  },
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fab
      className={`${styles.root} ${isVisible ? 'show' : ''}`}
      color='primary'
      aria-label='scroll-to-top'
      onClick={handleScrollToTop}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTop;
