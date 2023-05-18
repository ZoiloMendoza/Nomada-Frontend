//import React, { PropsWithChildren } from 'react';
import NavbarTwo from './Navbar/NavbarTwo';
import Footer from './Footer/Footer';
import ScrollToTop from './common/ScrollToTop';

const Layout = ({ children }) => (
  <>
    <NavbarTwo />
    {children}
    <ScrollToTop />
    <Footer />
  </>
);
export default Layout;
